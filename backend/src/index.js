import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import instructorRoutes from "./routes/instructor.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/users.js";
import errorHandler from "./middleware/errorHandler.js";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Apply Helmet security headers
app.use(helmet());

// Log HTTP requests
app.use(morgan("dev"));


// Dynamic CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100, // 100 req/min per IP
  message: { error: "Too many requests, please try again later." }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // max 10 requests per window
  message: { error: "Too many attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Expose API documentation via Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/uploads", express.static("uploads"));

// Apply rate limiters
app.use("/api", generalLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Global error handling middleware
app.use(errorHandler);


if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
