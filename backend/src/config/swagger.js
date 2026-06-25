import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "INTEXIA Cyber LMS API",
      version: "1.0.0",
      description: "API specifications for the INTEXIA Cyber Learning Management System platform.",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      "/auth/register": {
        post: {
          tags: ["Authentication"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    mobile: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: "User registered successfully" },
            400: { description: "User already exists or bad request" }
          }
        }
      },
      "/auth/login": {
        post: {
          tags: ["Authentication"],
          summary: "Log in an existing user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Successful login" },
            400: { description: "Invalid credentials" }
          }
        }
      },
      "/auth/refresh": {
        post: {
          tags: ["Authentication"],
          summary: "Renew access token using a refresh token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["refreshToken"],
                  properties: {
                    refreshToken: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "New access and refresh tokens" },
            401: { description: "Expired or invalid refresh token" }
          }
        }
      },
      "/courses": {
        get: {
          tags: ["Courses"],
          summary: "Get all approved courses",
          responses: {
            200: { description: "List of approved courses" }
          }
        }
      },
      "/courses/enrolled": {
        get: {
          tags: ["Courses"],
          summary: "Get enrolled courses of current student",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "List of enrolled courses" }
          }
        }
      },
      "/courses/{id}": {
        get: {
          tags: ["Courses"],
          summary: "Get course details by ID",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          responses: {
            200: { description: "Course object details" },
            404: { description: "Course not found" }
          }
        }
      },
      "/courses/{id}/enroll": {
        post: {
          tags: ["Courses"],
          summary: "Enroll current student in a course",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          responses: {
            200: { description: "Enrollment success" },
            400: { description: "Already enrolled or bad request" }
          }
        }
      },
      "/courses/{id}/progress": {
        get: {
          tags: ["Courses"],
          summary: "Get course progress and completed module IDs",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          responses: {
            200: { description: "Module completion details" }
          }
        },
        post: {
          tags: ["Courses"],
          summary: "Check/Uncheck a module as completed",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["moduleId", "completed"],
                  properties: {
                    moduleId: { type: "integer" },
                    completed: { type: "boolean" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Progress updated successfully" }
          }
        }
      },
      "/courses/certificates/{id}/download": {
        get: {
          tags: ["Courses"],
          summary: "Download PDF Certificate of course completion",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          responses: {
            200: { description: "PDF certificate file download stream" }
          }
        }
      },
      "/courses/activity/weekly": {
        get: {
          tags: ["Courses"],
          summary: "Get student's module completions history logs",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "List of completion timestamps" }
          }
        }
      },
      "/instructor/analytics": {
        get: {
          tags: ["Instructor"],
          summary: "Get instructor profile analytics",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Overview of student stats and course performances" }
          }
        }
      },
      "/instructor/courses": {
        get: {
          tags: ["Instructor"],
          summary: "List courses managed by instructor",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Instructor's course list" }
          }
        },
        post: {
          tags: ["Instructor"],
          summary: "Submit a new course",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "description", "tag", "difficulty", "duration", "totalLessons", "modules"],
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    tag: { type: "string" },
                    difficulty: { type: "string" },
                    duration: { type: "string" },
                    totalLessons: { type: "integer" },
                    modules: {
                      type: "array",
                      items: {
                        type: "object",
                        required: ["title", "duration"],
                        properties: {
                          title: { type: "string" },
                          duration: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: "Course created successfully" }
          }
        }
      },
      "/admin/users": {
        get: {
          tags: ["Admin"],
          summary: "Get all user profiles (Supports search and pagination)",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "role", in: "query", schema: { type: "string" } },
            { name: "search", in: "query", schema: { type: "string" } },
            { name: "page", in: "query", schema: { type: "integer" } },
            { name: "limit", in: "query", schema: { type: "integer" } }
          ],
          responses: {
            200: { description: "Paginated users roster" }
          }
        }
      },
      "/admin/users/{id}/status": {
        patch: {
          tags: ["Admin"],
          summary: "Toggle active/inactive status of a user account",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          responses: {
            200: { description: "Status updated successfully" }
          }
        }
      },
      "/admin/analytics": {
        get: {
          tags: ["Admin"],
          summary: "Get platform-wide analytics",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Registration and enrollment counts metrics" }
          }
        }
      }
    }
  },
  apis: [], // Defined manually above to prevent OS-specific path parsing issues
};

export const swaggerSpec = swaggerJsdoc(options);
