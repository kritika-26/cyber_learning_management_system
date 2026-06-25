import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import validate from "../middleware/validate.js";

const router = Router();

const generateTokens = async (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "cyber-lms-super-secret-key-change-me",
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, salt: Math.random().toString(36).substring(2) + Date.now() },
    process.env.JWT_REFRESH_SECRET || "cyber-lms-super-secret-refresh-key-change-me",
    { expiresIn: "7d" }
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt
    }
  });

  return { token, refreshToken };
};

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().toLowerCase().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  mobile: z.string().trim().nullable().optional()
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email format"),
  password: z.string().min(1, "Password is required")
});

// REGISTER
router.post("/register", validate(registerSchema), async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        mobile: mobile || null,
        role: "STUDENT"
      }
    });

    const { token, refreshToken } = await generateTokens(user);

    res.status(201).json({
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during registration." });
  }
});

// LOGIN
router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const { token, refreshToken } = await generateTokens(user);

    res.json({
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login." });
  }
});

// REFRESH TOKEN
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required." });
    }

    let payload;
    try {
      payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || "cyber-lms-super-secret-refresh-key-change-me"
      );
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired refresh token." });
    }

    const dbToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }
    });

    if (!dbToken) {
      await prisma.refreshToken.deleteMany({
        where: { userId: payload.id }
      });
      return res.status(403).json({ error: "Compromised session. Please log in again." });
    }

    if (dbToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { token: refreshToken } });
      return res.status(401).json({ error: "Refresh token has expired." });
    }

    await prisma.refreshToken.delete({ where: { token: refreshToken } });

    const user = await prisma.user.findUnique({
      where: { id: payload.id }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: "User is disabled or not found." });
    }

    const { token: newToken, refreshToken: newRefreshToken } = await generateTokens(user);

    res.json({ token: newToken, refreshToken: newRefreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during token refresh." });
  }
});

// LOGOUT
router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken }
      });
    }
    res.json({ message: "Successfully logged out." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during logout." });
  }
});

export default router;
