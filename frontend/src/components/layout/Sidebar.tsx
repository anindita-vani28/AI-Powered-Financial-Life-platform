'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  AlertCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  TrendingUp,
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: TrendingUp, label: 'Health Score', href: '/health-score' },
    { icon: FileText, label: 'Documents', href: '/documents' },
    { icon: AlertCircle, label: 'Alerts', href: '/alerts' },
    { icon: Users, label: 'Family', href: '/family' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-transform duration-300 z-40 md:z-0 pt-4`}
      >
        {/* Logo */}
        <div className="px-6 py-4 border-b border-slate-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            FinLife
          </h1>
          <p className="text-xs text-slate-400 mt-1">Financial Life Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors group"
            >
              <item.icon size={20} className="text-slate-400 group-hover:text-white" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-800/50">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
