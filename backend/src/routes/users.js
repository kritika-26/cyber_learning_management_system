import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import auth from "../middleware/auth.js";
import { upload } from "../utils/cloudinary.js";

const router = Router();

// PATCH USER PROFILE (Updates name, email, mobile, and avatar)
router.patch("/:id", auth, upload.single("avatar"), async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    // Authorization: User can only update their own profile, unless they are an ADMIN
    if (userId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Access denied. You can only update your own profile." });
    }

    const { name, email, mobile } = req.body;

    // Check email uniqueness if it's being updated
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email.trim().toLowerCase(),
          NOT: { id: userId }
        }
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use by another account." });
      }
    }

    // Determine avatar URL path (Cloudinary URL vs. local fallback path)
    let avatarUrl;
    if (req.file) {
      if (req.file.path.startsWith("http")) {
        avatarUrl = req.file.path;
      } else {
        const cleanPath = req.file.path.replace(/\\/g, "/");
        avatarUrl = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name: name.trim() }),
        ...(email && { email: email.trim().toLowerCase() }),
        ...(mobile !== undefined && { mobile: mobile ? mobile.trim() : null }),
        ...(avatarUrl && { avatar: avatarUrl })
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        mobile: true,
        avatar: true,
        isActive: true
      }
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during profile update." });
  }
});

export default router;
