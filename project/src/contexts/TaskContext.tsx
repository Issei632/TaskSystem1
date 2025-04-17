import React, { createContext, useContext, useState, useEffect } from "react";
import { Task } from "../types";

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token"); // Retrieve token
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
