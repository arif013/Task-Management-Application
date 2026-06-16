import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTasks,
  taskCount,
  updateTask,
} from "../controllers/task.controller.js";
import authenticate from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { getAllTasks, getAllUsers } from "../controllers/admin.controller.js";

const router = Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// Admin endpoints
router.get("/admin/all-users", authenticate, authorize("admin"), getAllUsers);
router.get("/admin/all-tasks", authenticate, authorize('admin'), getAllTasks)

// Task routes
router.post("/tasks", authenticate, createTask);
router.get("/tasks", authenticate, getTasks);
router.get("/tasks/:id", authenticate, getSingleTask);
router.get("/tasks/task-count", authenticate, taskCount);
router.patch("/tasks/:id", authenticate, updateTask);
router.delete("/tasks/:id", authenticate, deleteTask);
// router.get("/tasks?status=")

export default router;
