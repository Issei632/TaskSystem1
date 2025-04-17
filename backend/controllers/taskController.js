const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, status, priority, dueDate } = req.body;
    const userId = req.user.userId; // Extracted from JWT middleware
    console.log("title", title, status, priority, dueDate, userId);
    const task = new Task({
      user: userId,
      title,
      status,
      priority,
      dueDate,
    });

    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get User Tasks
const getUserTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ user: userId });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;
    const userId = req.user.userId;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updates,
      { new: true }
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createTask, getUserTasks, updateTask };
