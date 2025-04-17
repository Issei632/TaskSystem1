import React from "react";
import { BarChart3, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useTasks } from "../contexts/TaskContext";

const Analytics: React.FC = () => {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const todoTasks = tasks.filter((task) => task.status === "todo").length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;
  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "medium"
  ).length;
  const lowPriorityTasks = tasks.filter(
    (task) => task.priority === "low"
  ).length;

  const calculatePercentage = (value: number) => {
    return totalTasks === 0 ? 0 : Math.round((value / totalTasks) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Task Status Overview */}
      <div
        className="rounded-lg shadow p-6"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text)",
        }}
      >
        <h2 className="text-lg font-medium mb-6 flex items-center">
          <BarChart3
            className="h-5 w-5 mr-2"
            style={{ color: "var(--primary)" }}
          />
          Task Status Overview
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Tasks */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--card-indigo)" }}
          >
            <dt
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Total Tasks
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {totalTasks}
            </dd>
          </div>

          {/* Completed Tasks */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--card-green)" }}
          >
            <dt
              className="flex items-center text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <CheckCircle2
                className="h-4 w-4 mr-1"
                style={{ color: "var(--primary)" }}
              />
              Completed
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {completedTasks}
            </dd>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {calculatePercentage(completedTasks)}% of total
            </p>
          </div>

          {/* In Progress Tasks */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--card-yellow)" }}
          >
            <dt
              className="flex items-center text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <Clock
                className="h-4 w-4 mr-1"
                style={{ color: "var(--primary)" }}
              />
              In Progress
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {inProgressTasks}
            </dd>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {calculatePercentage(inProgressTasks)}% of total
            </p>
          </div>

          {/* To Do Tasks */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--card-gray)" }}
          >
            <dt
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              To Do
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {todoTasks}
            </dd>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {calculatePercentage(todoTasks)}% of total
            </p>
          </div>
        </div>
      </div>

      {/* Priority Distribution */}
      <div
        className="rounded-lg shadow p-6"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text)",
        }}
      >
        <h2 className="text-lg font-medium mb-6">Priority Distribution</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* High Priority */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--card-red)" }}
          >
            <dt
              className="flex items-center text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <AlertTriangle
                className="h-4 w-4 mr-1"
                style={{ color: "var(--primary)" }}
              />
              High Priority
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {highPriorityTasks}
            </dd>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {calculatePercentage(highPriorityTasks)}% of total
            </p>
          </div>

          {/* Medium Priority */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--card-yellow)" }}
          >
            <dt
              className="flex items-center text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <Clock
                className="h-4 w-4 mr-1"
                style={{ color: "var(--primary)" }}
              />
              Medium Priority
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {mediumPriorityTasks}
            </dd>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {calculatePercentage(mediumPriorityTasks)}% of total
            </p>
          </div>

          {/* Low Priority */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--card-green)" }}
          >
            <dt
              className="flex items-center text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              <CheckCircle2
                className="h-4 w-4 mr-1"
                style={{ color: "var(--primary)" }}
              />
              Low Priority
            </dt>
            <dd
              className="mt-1 text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {lowPriorityTasks}
            </dd>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {calculatePercentage(lowPriorityTasks)}% of total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
