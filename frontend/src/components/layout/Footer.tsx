import React from "react";
import { Link } from "react-router-dom";
import Icon from "../shared/Icon";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 md:px-10 mt-12 mb-16 lg:mb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2">
          <div className="flex items-center gap-3 text-white mb-6">
            <div className="bg-primary p-1 rounded-lg">
              <Icon name="lock" size="sm" />
            </div>
            <h2 className="text-lg font-black tracking-tight">AuthApp</h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed">
            A clean, production-ready authentication template built with React, TypeScript, Node.js, and MongoDB.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-primary" to="/">Dashboard</Link></li>
            <li><Link className="hover:text-primary" to="/profile">Profile</Link></li>
            <li><Link className="hover:text-primary" to="/login">Login</Link></li>
            <li><Link className="hover:text-primary" to="/register">Register</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Tech Stack</h4>
          <ul className="space-y-2 text-sm">
            <li><span>React + TypeScript</span></li>
            <li><span>Node.js + Express</span></li>
            <li><span>MongoDB + Mongoose</span></li>
            <li><span>JWT Auth</span></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} AuthApp. Clean Auth Template.</p>
      </div>
    </footer>
  );
};

export default Footer;
