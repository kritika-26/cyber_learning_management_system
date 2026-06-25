import { Router } from "express";
import { z } from "zod";
import PDFDocument from "pdfkit";
import { prisma } from "../lib/prisma.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { sendEmail } from "../utils/mailer.js";
import { upload } from "../utils/cloudinary.js";



const router = Router();

const progressSchema = z.object({
  moduleId: z.number().int("moduleId must be an integer"),
  completed: z.boolean()
});


// GET ALL COURSES
router.get("/", async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { approved: true },
      include: {
        modules: true
      }
    });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving courses." });
  }
});

// GET USER'S ENROLLED COURSES
router.get("/enrolled", auth, async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      include: {
        course: {
          include: {
            modules: true
          }
        }
      }
    });
    const courses = enrollments.map((e) => e.course);
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving enrolled courses." });
  }
});

// GET USER'S WEEKLY ACTIVITY COMPLETIONS
router.get("/activity/weekly", auth, async (req, res) => {
  try {
    const completions = await prisma.moduleCompletion.findMany({
      where: { userId: req.user.id },
      select: { createdAt: true }
    });
    res.json(completions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving weekly activity." });
  }
});

// GET USER'S CERTIFICATES
router.get("/certificates", auth, async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany({
      where: { userId: req.user.id }
    });

    const certificatesWithCourses = await Promise.all(
      certificates.map(async (cert) => {
        const course = await prisma.course.findUnique({
          where: { id: cert.courseId },
          include: { modules: true }
        });
        return { ...cert, course };
      })
    );

    res.json(certificatesWithCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving certificates." });
  }
});

// GET SINGLE COURSE BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: {
        modules: true
      }
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving course details." });
  }
});

// ENROLL IN A COURSE
router.post("/:id/enroll", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const courseId = parseInt(id);

    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId
        }
      }
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: "Already enrolled in this course." });
    }

    // Enroll user and initialize progress
    await prisma.$transaction([
      prisma.enrollment.create({
        data: {
          userId: req.user.id,
          courseId
        }
      }),
      prisma.progress.create({
        data: {
          userId: req.user.id,
          courseId,
          completedLessons: 0
        }
      })
    ]);

    // Send Enrollment Confirmation Email (Non-blocking)
    prisma.user.findUnique({ where: { id: req.user.id } })
      .then((user) => {
        if (user) {
          sendEmail({
            to: user.email,
            subject: `Enrollment Confirmed: ${course.title}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; padding: 20px; background-color: #070B14; color: #F5F7FA; border: 1px solid #00F5FF; border-radius: 12px;">
                <h2 style="color: #00F5FF; border-bottom: 1px solid rgba(124, 92, 255, 0.15); padding-bottom: 10px; margin-bottom: 20px;">INTEXIA Platform</h2>
                <p>Hi ${user.name || "Student"},</p>
                <p>You have successfully enrolled in <strong>${course.title}</strong>!</p>
                <p>Your learning tracker has been initialized. Complete all modules of this course to earn your verified certificate of completion.</p>
                <br/>
                <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/my-courses" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #D946EF, #00E5FF); color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Start Learning Now</a>
                <p style="margin-top: 30px; font-size: 12px; color: #8b94a7;">Need help? Contact support@intexia.com</p>
              </div>
            `
          });
        }
      })
      .catch((err) => console.error("Error sending enrollment email:", err));

    res.status(201).json({ message: "Successfully enrolled in course." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during course enrollment." });
  }
});

// GET COURSE PROGRESS
router.get("/:id/progress", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const courseId = parseInt(id);

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId
        }
      }
    });

    if (!enrollment) {
      return res.json(null);
    }

    const completions = await prisma.moduleCompletion.findMany({
      where: {
        userId: req.user.id,
        module: { courseId }
      },
      select: {
        moduleId: true
      }
    });

    const completedModuleIds = completions.map((c) => c.moduleId);

    res.json({
      data: completedModuleIds,
      completedLessons: completedModuleIds.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving progress." });
  }
});

// UPDATE COURSE PROGRESS
router.post("/:id/progress", auth, validate(progressSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { moduleId, completed } = req.body;
    const courseId = parseInt(id);


    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId
        }
      }
    });

    if (!enrollment) {
      return res.status(400).json({ error: "User is not enrolled in this course." });
    }

    // Upsert or delete module completion
    if (completed) {
      await prisma.moduleCompletion.upsert({
        where: {
          userId_moduleId: {
            userId: req.user.id,
            moduleId: parseInt(moduleId)
          }
        },
        update: {
          completed: true
        },
        create: {
          userId: req.user.id,
          moduleId: parseInt(moduleId),
          completed: true
        }
      });
    } else {
      await prisma.moduleCompletion.deleteMany({
        where: {
          userId: req.user.id,
          moduleId: parseInt(moduleId)
        }
      });
    }

    // Get updated list of completed modules for this course
    const completions = await prisma.moduleCompletion.findMany({
      where: {
        userId: req.user.id,
        module: { courseId }
      },
      select: {
        moduleId: true
      }
    });

    const completedModuleIds = completions.map((c) => c.moduleId);

    // Sync to Progress model
    await prisma.progress.upsert({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId
        }
      },
      update: {
        completedLessons: completedModuleIds.length
      },
      create: {
        userId: req.user.id,
        courseId,
        completedLessons: completedModuleIds.length
      }
    });

    // Check if course is fully completed
    const allModules = await prisma.module.findMany({
      where: { courseId }
    });

    if (completedModuleIds.length === allModules.length && allModules.length > 0) {
      // Auto-generate certificate if it does not exist
      const existingCert = await prisma.certificate.findFirst({
        where: {
          userId: req.user.id,
          courseId
        }
      });

      if (!existingCert) {
        await prisma.certificate.create({
          data: {
            userId: req.user.id,
            courseId
          }
        });

        // Trigger Certificate Ready Email (Non-blocking)
        Promise.all([
          prisma.user.findUnique({ where: { id: req.user.id } }),
          prisma.course.findUnique({ where: { id: courseId } })
        ])
          .then(([user, courseItem]) => {
            if (user && courseItem) {
              sendEmail({
                to: user.email,
                subject: `Certificate Ready: ${courseItem.title}`,
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; padding: 20px; background-color: #070B14; color: #F5F7FA; border: 1px solid #00F5FF; border-radius: 12px;">
                    <h2 style="color: #00F5FF; border-bottom: 1px solid rgba(124, 92, 255, 0.15); padding-bottom: 10px; margin-bottom: 20px;">INTEXIA Platform</h2>
                    <p>Hi ${user.name || "Student"},</p>
                    <p>Congratulations! You have successfully completed the course <strong>${courseItem.title}</strong>!</p>
                    <p>Your official, verified certificate of completion has been generated and is ready for download.</p>
                    <br/>
                    <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/certificates" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #D946EF, #00E5FF); color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Download Certificate (PDF)</a>
                    <p style="margin-top: 30px; font-size: 12px; color: #8b94a7;">Need help? Contact support@intexia.com</p>
                  </div>
                `
              });
            }
          })
          .catch((err) => console.error("Error sending certificate email:", err));
      }
    }

    res.json({
      data: completedModuleIds,
      completedLessons: completedModuleIds.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating progress." });
  }
});

// GET /api/courses/certificates/:id/download
router.get("/certificates/:id/download", auth, async (req, res) => {
  try {
    const certId = parseInt(req.params.id);
    const cert = await prisma.certificate.findUnique({
      where: { id: certId }
    });

    if (!cert) return res.status(404).json({ error: "Certificate not found." });

    // Only the owner can download their cert
    if (cert.userId !== req.user.id) {
      return res.status(403).json({ error: "Forbidden." });
    }

    const user = await prisma.user.findUnique({ where: { id: cert.userId } });
    const course = await prisma.course.findUnique({ where: { id: cert.courseId } });

    const doc = new PDFDocument({ margin: 60 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="certificate-${cert.id}.pdf"`
    );

    doc.pipe(res);

    doc
      .fontSize(28)
      .text("Certificate of Completion", { align: "center" });

    doc.moveDown();
    doc.fontSize(16).text("This certifies that", { align: "center" });

    doc.moveDown();
    doc.fontSize(22).text(user.name, { align: "center" });

    doc.moveDown();
    doc.fontSize(16).text(`has successfully completed`, { align: "center" });

    doc.moveDown();
    doc.fontSize(20).text(course.title, { align: "center" });

    doc.moveDown();
    doc
      .fontSize(12)
      .text(
        `Issued on ${new Date(cert.issuedAt).toLocaleDateString("en-IN")}`,
        { align: "center" }
      );

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error generating certificate PDF." });
  }
});

// UPLOAD A RESOURCE TO A MODULE
router.post(
  "/:courseId/modules/:moduleId/resources",
  auth,
  upload.single("file"),
  async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const moduleId = parseInt(req.params.moduleId);

      if (isNaN(courseId) || isNaN(moduleId)) {
        return res.status(400).json({ error: "Invalid course ID or module ID." });
      }

      // Check course ownership
      const course = await prisma.course.findUnique({
        where: { id: courseId }
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found." });
      }

      if (req.user.role !== "ADMIN" && course.instructorId !== req.user.id) {
        return res.status(403).json({ error: "Access denied. Only the course instructor or an administrator can add resources." });
      }

      const { title, fileType } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Resource title is required." });
      }

      let fileUrl;
      if (req.file) {
        if (req.file.path.startsWith("http")) {
          fileUrl = req.file.path;
        } else {
          const cleanPath = req.file.path.replace(/\\/g, "/");
          fileUrl = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
        }
      } else {
        return res.status(400).json({ error: "Resource file upload is required." });
      }

      const resource = await prisma.resource.create({
        data: {
          moduleId,
          title: title.trim(),
          fileUrl,
          fileType: fileType || "pdf"
        }
      });

      res.status(201).json(resource);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error uploading resource." });
    }
  }
);

// GET RESOURCES FOR A MODULE
router.get("/:courseId/modules/:moduleId/resources", auth, async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const moduleId = parseInt(req.params.moduleId);

    if (isNaN(courseId) || isNaN(moduleId)) {
      return res.status(400).json({ error: "Invalid course ID or module ID." });
    }

    // Verify course & module exists
    const moduleItem = await prisma.module.findFirst({
      where: { id: moduleId, courseId }
    });

    if (!moduleItem) {
      return res.status(404).json({ error: "Module not found in this course." });
    }

    const resources = await prisma.resource.findMany({
      where: { moduleId }
    });

    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving resources." });
  }
});

// POST /:courseId/modules/:moduleId/complete
router.post("/:courseId/modules/:moduleId/complete", auth, async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const moduleId = parseInt(req.params.moduleId);

    if (isNaN(courseId) || isNaN(moduleId)) {
      return res.status(400).json({ error: "Invalid course ID or module ID." });
    }

    // 1. Save this module completion
    await prisma.moduleCompletion.upsert({
      where: {
        userId_moduleId: {
          userId: req.user.id,
          moduleId
        }
      },
      update: {
        completed: true
      },
      create: {
        userId: req.user.id,
        moduleId,
        completed: true
      }
    });

    // Sync to Progress
    const completions = await prisma.moduleCompletion.findMany({
      where: {
        userId: req.user.id,
        module: { courseId }
      },
      select: { moduleId: true }
    });

    const completedModuleIds = completions.map((c) => c.moduleId);

    await prisma.progress.upsert({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId
        }
      },
      update: {
        completedLessons: completedModuleIds.length
      },
      create: {
        userId: req.user.id,
        courseId,
        completedLessons: completedModuleIds.length
      }
    });

    // 2. Check if ALL modules in this course are now complete
    const allModules = await prisma.module.findMany({
      where: { courseId }
    });

    const isCourseComplete = completedModuleIds.length === allModules.length && allModules.length > 0;

    if (isCourseComplete) {
      // 3. Check certificate doesn't already exist
      const existingCert = await prisma.certificate.findFirst({
        where: {
          userId: req.user.id,
          courseId
        }
      });

      if (!existingCert) {
        await prisma.certificate.create({
          data: {
            userId: req.user.id,
            courseId
          }
        });

        // Trigger Certificate Ready Email (Non-blocking)
        Promise.all([
          prisma.user.findUnique({ where: { id: req.user.id } }),
          prisma.course.findUnique({ where: { id: courseId } })
        ])
          .then(([user, courseItem]) => {
            if (user && courseItem) {
              sendEmail({
                to: user.email,
                subject: `Certificate Ready: ${courseItem.title}`,
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; padding: 20px; background-color: #070B14; color: #F5F7FA; border: 1px solid #00F5FF; border-radius: 12px;">
                    <h2 style="color: #00F5FF; border-bottom: 1px solid rgba(124, 92, 255, 0.15); padding-bottom: 10px; margin-bottom: 20px;">INTEXIA Platform</h2>
                    <p>Hi ${user.name || "Student"},</p>
                    <p>Congratulations! You have successfully completed the course <strong>${courseItem.title}</strong>!</p>
                    <p>Your official, verified certificate of completion has been generated and is ready for download.</p>
                    <br/>
                    <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/certificates" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #D946EF, #00E5FF); color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Download Certificate (PDF)</a>
                    <p style="margin-top: 30px; font-size: 12px; color: #8b94a7;">Need help? Contact support@intexia.com</p>
                  </div>
                `
              });
            }
          })
          .catch((err) => console.error("Error sending certificate email:", err));
      }
    }

    res.json({ complete: isCourseComplete });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during module completion." });
  }
});

export default router;

