import express from "express";
import {
  createTask,
  dashboardStatistics,
  duplicateTask,
  getTasks,
  postTaskActivity,
} from "../controllers/task.controller.js";
import { isAdminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
// router.get("/:id", protectRoute, getTask);

// router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
// router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
// router.put("/:id", protectRoute, isAdminRoute, trashTask);

// router.delete(
//   "/delete-restore/:id?",
//   protectRoute,
//   isAdminRoute,
//   deleteRestoreTask
// );

export default router;
