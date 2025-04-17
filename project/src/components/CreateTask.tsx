import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { useTasks } from "../contexts/TaskContext";
import { Task } from "../types";
import { useAuthStore } from "../store/useAuthStore";

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const { fetchTasks } = useTasks();
  const token = useAuthStore((state) => state.token);
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: "",
    status: "todo",
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("token", token);
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTask = await response.json();
      fetchTasks(); // Refresh task list
      // addTask(newTask); // Update local state/context with the new task
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div
      className="shadow sm:rounded-lg"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text)",
      }}
    >
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium">Create New Task</h3>
        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Task Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
              value={task.priority}
              onChange={(e) =>
                setTask({
                  ...task,
                  priority: e.target.value as Task["priority"],
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
              value={task.status}
              onChange={(e) =>
                setTask({ ...task, status: e.target.value as Task["status"] })
              }
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Due Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar
                  className="h-5 w-5"
                  style={{ color: "var(--text-secondary)" }}
                />
              </div>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                required
                className="block w-full pl-10 sm:text-sm rounded-md"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--text)",
              }}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
