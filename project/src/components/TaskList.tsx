import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Pencil,
  X,
  Check,
} from "lucide-react";
import { Task } from "../types";
import { useTasks } from "../contexts/TaskContext";

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};


const TaskList: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Task>>({});

  const getPriorityIcon = (task) => {
    console.log(task.priority);
    switch (task.priority) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
  };

  const handleEdit = (task: Task & { _id: string }) => {
    setEditingTask(task._id);
    setEditForm(task);
  };

  const handleUpdate = (editingTask: string, editForm: Partial<Task>) => {
    console.log(editingTask, editForm);
    if (editingTask && editForm) {
      updateTask(editingTask, editForm);
      setEditingTask(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    setEditForm({});
  };
  console.log(editForm, editingTask);
  return (
    <div
      className="rounded-lg shadow"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text)",
      }}
    >
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium mb-4">Your Tasks</h2>
        <div className="space-y-4">
          {tasks &&
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 rounded-lg border"
                style={{
                  backgroundColor: "var(--card-background)",
                  borderColor: "var(--border)",
                }}
              >
                {editingTask === task._id ? (
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={editForm.title || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="block w-full rounded-md shadow-sm sm:text-sm"
                      style={{
                        backgroundColor: "var(--background)",
                        color: "var(--text)",
                        borderColor: "var(--border)",
                      }}
                    />
                    <div className="flex space-x-4">
                      <select
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            status: e.target.value as Task["status"],
                          })
                        }
                        className="rounded-md shadow-sm sm:text-sm"
                        style={{
                          backgroundColor: "var(--background)",
                          color: "var(--text)",
                          borderColor: "var(--border)",
                        }}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <select
                        value={editForm.priority}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            priority: e.target.value as Task["priority"],
                          })
                        }
                        className="rounded-md shadow-sm sm:text-sm"
                        style={{
                          backgroundColor: "var(--background)",
                          color: "var(--text)",
                          borderColor: "var(--border)",
                        }}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <input
                        type="date"
                        value={editForm.dueDate || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, dueDate: e.target.value })
                        }
                        className="rounded-md shadow-sm sm:text-sm"
                        style={{
                          backgroundColor: "var(--background)",
                          color: "var(--text)",
                          borderColor: "var(--border)",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 flex-1">
                    {getPriorityIcon(task)}
                    <div>
                      <h3
                        className="text-sm font-medium"
                        style={{ color: "var(--text)" }}
                      >
                        {task.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Due: {task.dueDate}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  {editingTask === task._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(editingTask, editForm)}
                        className="p-1 text-green-600 hover:text-green-900"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-1 text-red-600 hover:text-red-900"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(task)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
