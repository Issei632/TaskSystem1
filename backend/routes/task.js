const express = require("express");
const {
  createTask,
  getUserTasks,
  updateTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getUserTasks);
router.put("/:taskId", authMiddleware, updateTask);

module.exports = router;
