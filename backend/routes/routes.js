import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import { createTask, getSingleTask, getTasks } from "../controllers/task.controller.js";
import authenticate from "../utils/authenticate.js";

const router = Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// Task routes
router.post("/tasks", authenticate, createTask);
router.get("/tasks", authenticate, getTasks);
router.get("/tasks/:id", authenticate, getSingleTask)

export default router;
