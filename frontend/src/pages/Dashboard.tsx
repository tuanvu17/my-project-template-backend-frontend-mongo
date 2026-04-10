import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Icon from "../components/shared/Icon";
import DarkModeToggle from "../components/DarkModeToggle";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="animate-pulse h-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
      </MainLayout>
    );
  }

  if (!user) return null;

  const roleBadgeColor: Record<string, string> = {
    Admin: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    User: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Visitor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <MainLayout>
      <main className="max-w-2xl mx-auto w-full px-4 py-8 pb-24 lg:pb-8">
        {/* Welcome Card */}
        <div className="bg-primary rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Icon name="person" size="lg" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Welcome back,</p>
              <h1 className="text-2xl font-bold">{user.displayname}</h1>
              <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${roleBadgeColor[user.role] || roleBadgeColor.Visitor}`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
            Account Details
          </h2>
          <dl className="space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="badge" size="sm" className="text-slate-400 shrink-0" />
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">Username</dt>
                <dd className="font-medium text-slate-900 dark:text-slate-100">{user.username}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="mail" size="sm" className="text-slate-400 shrink-0" />
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">Email</dt>
                <dd className="font-medium text-slate-900 dark:text-slate-100">{user.email || "—"}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="shield" size="sm" className="text-slate-400 shrink-0" />
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">Role</dt>
                <dd className="font-medium text-slate-900 dark:text-slate-100">{user.role}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="calendar_today" size="sm" className="text-slate-400 shrink-0" />
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">Member since</dt>
                <dd className="font-medium text-slate-900 dark:text-slate-100">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Dark Mode Demo Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-300">Dark Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Toggle between light and dark theme</p>
            </div>
            <DarkModeToggle />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            <Icon name="settings" size="sm" />
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-3 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <Icon name="logout" size="sm" />
            Logout
          </button>
        </div>
      </main>
    </MainLayout>
  );
};

export default Dashboard;
