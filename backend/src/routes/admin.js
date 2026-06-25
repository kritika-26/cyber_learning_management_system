import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const router = Router();

const roleSchema = z.object({
  role: z.enum(["STUDENT", "INSTRUCTOR", "ADMIN"], {
    errorMap: () => ({ message: "Invalid role value. Must be STUDENT, INSTRUCTOR, or ADMIN." })
  })
});

const approveSchema = z.object({
  approved: z.boolean({
    required_error: "approved status is required.",
    invalid_type_error: "approved status must be a boolean."
  })
});

// Middleware to require ADMIN role
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Admin role required." });
  }
}

// GET ALL USERS WITH FILTERS
router.get("/users", auth, requireAdmin, async (req, res) => {
  try {
    const { role, search, page = 1, limit = 50 } = req.query;
    const where = {};
    
    if (role && role !== "All") {
      where.role = role.toUpperCase();
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true
        }
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      users,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving users." });
  }
});

// UPDATE USER ROLE
router.patch("/users/:id/role", auth, requireAdmin, validate(roleSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating user role." });
  }
});

// PATCH USER STATUS (ACTIVE/DEACTIVE)
router.patch("/users/:id/status", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { isActive: true }
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const nextStatus = body.isActive !== undefined ? !!body.isActive : !existingUser.isActive;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isActive: nextStatus },
      select: {
        id: true,
        name: true,
        isActive: true
      }
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating user status." });
  }
});

// DELETE USER
router.delete("/users/:id", auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (userId === req.user.id) {
      return res.status(400).json({ error: "You cannot delete your own account." });
    }

    await prisma.$transaction([
      prisma.moduleCompletion.deleteMany({ where: { userId } }),
      prisma.progress.deleteMany({ where: { userId } }),
      prisma.enrollment.deleteMany({ where: { userId } }),
      prisma.certificate.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } })
    ]);

    res.json({ message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error deleting user." });
  }
});

// GET PENDING COURSES
router.get("/courses/pending", auth, requireAdmin, async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { approved: false },
      include: {
        modules: true
      }
    });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving pending courses." });
  }
});

// APPROVE/REJECT COURSE
router.patch("/courses/:id/approve", auth, requireAdmin, validate(approveSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: { approved: !!approved }
    });

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating course approval status." });
  }
});

// PLATFORM ANALYTICS
router.get("/analytics", auth, requireAdmin, async (req, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,
      totalEnrollments,
      totalCertificates,
      usersByRole,
      enrollmentsPerCourse,
      recentSignups
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.user.count({ where: { role: "INSTRUCTOR" } }),
      prisma.course.count(),
      prisma.enrollment.count(),
      prisma.certificate.count(),
      prisma.user.groupBy({ by: ["role"], _count: true }),
      prisma.enrollment.groupBy({
        by: ["courseId"],
        _count: { courseId: true },
        orderBy: { _count: { courseId: "desc" } },
        take: 5
      }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, name: true, role: true, createdAt: true }
      })
    ]);

    // Map top courses with title details for rendering charts
    const topCoursesWithDetails = await Promise.all(
      enrollmentsPerCourse.map(async (item) => {
        const course = await prisma.course.findUnique({
          where: { id: item.courseId },
          select: { title: true }
        });
        return {
          courseId: item.courseId,
          count: item._count.courseId,
          title: course ? course.title : `Course #${item.courseId}`
        };
      })
    );

    res.json({
      totals: {
        users: totalUsers,
        courses: totalCourses,
        enrollments: totalEnrollments,
        certificates: totalCertificates
      },
      usersByRole,
      topCourses: topCoursesWithDetails,
      recentSignups,

      // Compatibility fallback structures
      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,
      totalEnrollments,
      totalCertificates
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving platform analytics." });
  }
});

// MONTHLY ENROLLMENTS TREND (RECHARTS COMPATIBLE)
router.get("/analytics/monthly", auth, requireAdmin, async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT DATE_TRUNC('month', "enrolledAt") AS month,
             COUNT(*)::int AS enrollments
      FROM "Enrollment"
      GROUP BY month
      ORDER BY month ASC
      LIMIT 12
    `;

    const formattedResult = result.map((item) => {
      const date = new Date(item.month);
      return {
        month: date.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
        enrollments: item.enrollments
      };
    });

    res.json(formattedResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving monthly trend." });
  }
});

// GET PLATFORM SETTINGS (Returns array of settings)
router.get("/settings", auth, requireAdmin, async (req, res) => {
  try {
    const settings = await prisma.setting.findMany();
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error retrieving settings." });
  }
});

// PATCH PLATFORM SETTING BY KEY
router.patch("/settings/:key", auth, requireAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    if (value === undefined) {
      return res.status(400).json({ error: "value is required." });
    }

    const setting = await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) }
    });
    res.json(setting);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error saving setting." });
  }
});

// PATCH PLATFORM SETTINGS BULK
router.patch("/settings", auth, requireAdmin, async (req, res) => {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== "object") {
      return res.status(400).json({ error: "Invalid updates format." });
    }

    const ops = Object.entries(updates).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      })
    );

    await Promise.all(ops);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error saving settings." });
  }
});

export default router;
