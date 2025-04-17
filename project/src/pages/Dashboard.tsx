import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  ListTodo,
  BarChart3,
  Settings as SettingsIcon,
  Plus,
} from "lucide-react";
import TaskList from "../components/TaskList";
import Analytics from "../components/Analytics";
import Settings from "../components/Settings";
import CreateTask from "../components/CreateTask";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper function for dynamic styling based on active link
  const getNavLinkClass = (path: string) =>
    currentPath === path
      ? "border-[var(--primary)] text-[var(--primary-hover)] font-semibold"
      : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border)]";

  return (
    <div className="min-h-screen bg-[var(--main-background)] text-[var(--text)]">
      {/* Header */}
      <header className="bg-[var(--main-background)] border-b border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ListTodo className="h-8 w-8 text-[var(--primary)]" />
              <h1 className="text-2xl font-bold">Task Manager</h1>
            </div>
            <Link
              to="/dashboard/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[var(--main-background)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              to="/dashboard"
              className={`${getNavLinkClass(
                "/dashboard"
              )} flex items-center px-1 pt-1 border-b-2 text-sm font-medium py-4 transition duration-200`}
            >
              <ListTodo className="h-5 w-5 mr-2" />
              Tasks
            </Link>
            <Link
              to="/dashboard/analytics"
              className={`${getNavLinkClass(
                "/dashboard/analytics"
              )} flex items-center px-1 pt-1 border-b-2 text-sm font-medium py-4 transition duration-200`}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Analytics
            </Link>
            <Link
              to="/dashboard/settings"
              className={`${getNavLinkClass(
                "/dashboard/settings"
              )} flex items-center px-1 pt-1 border-b-2 text-sm font-medium py-4 transition duration-200`}
            >
              <SettingsIcon className="h-5 w-5 mr-2" />
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create" element={<CreateTask />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
