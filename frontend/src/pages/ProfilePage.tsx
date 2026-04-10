import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Icon from "../components/shared/Icon";
import { useAuth } from "../hooks/useAuth";
import { apiUpdateMe, apiGetMe } from "../api/api";
import { User } from "../types";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile form state
  const [displayname, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  // Change password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await apiGetMe();
        if (res.data.success) {
          const userData = res.data.data;
          setUser(userData);
          setDisplayname(userData.displayname || "");
          setEmail(userData.email || "");
        }
      } catch (err) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setDisplayname(userData.displayname || "");
          setEmail(userData.email || "");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [isAuthenticated, navigate]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileMessage("");
    try {
      const res = await apiUpdateMe({ displayname, email });
      if (res.data.success) {
        const updatedUser = res.data.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setProfileMessage("Profile updated successfully!");
      }
    } catch (err: any) {
      setProfileMessage(err.response?.data?.msg || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage("");
    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage("Password must be at least 6 characters");
      return;
    }
    setChangingPassword(true);
    try {
      const res = await apiUpdateMe({ password: newPassword, currentPassword });
      if (res.data.success) {
        setPasswordMessage("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      setPasswordMessage(err.response?.data?.msg || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="animate-pulse h-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-600 dark:text-slate-400">Could not load account information</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="max-w-2xl mx-auto w-full px-4 py-8 pb-24 lg:pb-8">
        <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
          Account Settings
        </h1>

        {/* Update Profile */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="person" size="sm" className="text-primary" />
            Profile Information
          </h2>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Display Name
              </label>
              <input
                type="text"
                value={displayname}
                onChange={(e) => setDisplayname(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                placeholder="Your display name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                placeholder="email@example.com"
              />
            </div>
            {profileMessage && (
              <p className={`text-sm ${profileMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {profileMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="lock" size="sm" className="text-primary" />
            Change Password
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-slate-800"
                placeholder="Confirm new password"
              />
            </div>
            {passwordMessage && (
              <p className={`text-sm ${passwordMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {passwordMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={changingPassword}
              className="bg-slate-800 dark:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-700 dark:hover:bg-slate-600 transition-all disabled:opacity-50"
            >
              {changingPassword ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </main>
    </MainLayout>
  );
};

export default ProfilePage;
