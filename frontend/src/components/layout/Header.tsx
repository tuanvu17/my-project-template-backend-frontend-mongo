import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../shared/Icon";
import DarkModeToggle from "../DarkModeToggle";

interface HeaderProps {
  user?: {
    displayname: string;
    email: string;
  } | null;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <Icon name="lock" size="md" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 hidden sm:block">
              AuthApp
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
            <Link to="/" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            {user && (
              <Link to="/profile" className="hover:text-primary transition-colors">
                Profile
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
            <DarkModeToggle />

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-primary/10 flex items-center justify-center"
                >
                  <Icon name="person" size="sm" className="text-primary" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-5 rounded-lg text-sm transition-all"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
            <nav className="flex flex-col px-4 py-4 space-y-3">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              {user && (
                <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
              )}
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-left text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-2 flex justify-around items-center z-50">
        <Link to="/" className="flex flex-col items-center gap-1 text-primary">
          <Icon name="dashboard" size="sm" />
          <span className="text-[10px] font-bold">Dashboard</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400">
          <Icon name="person" size="sm" />
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </nav>
    </>
  );
};

export default Header;
