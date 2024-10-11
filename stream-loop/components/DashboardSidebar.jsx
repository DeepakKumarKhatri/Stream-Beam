"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BarChart2,
  Settings,
  Video,
  Users,
  Calendar,
  HelpCircle,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  Plus,
  Radio,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Audience", href: "/audience" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDOpen, setIsDOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDOpen(!isDOpen);

  return (
    <div className="flex">
      {/* Sidebar for Desktop (Always visible on larger screens) */}
      <aside className="hidden md:block fixed top-0 left-0 w-64 h-full bg-card text-card-foreground z-50">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Stream Loop
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    pathname === item.href ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </motion.div>
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={toggleDropdown}
                className="flex items-center p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group justify-between"
              >
                <div className="flex items-center">
                  <Video className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3">Streams</span>
                </div>
                {isDOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Dropdown Menu */}
              {isDOpen && (
                <ul className="pl-6 space-y-2">
                  <li>
                    <Link
                      href="/dashboard/streams/live"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <Radio className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                      <span className="ml-3">Live</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/streams/new"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <Plus className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                      <span className="ml-3">Start New</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="absolute bottom-0 left-1 right-[0%] p-4">
          <Link
            href="/help"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <HelpCircle className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="ml-3">Help & Support</span>
          </Link>
        </div>
      </aside>

      {/* Main content adjusted with margin on larger screens */}
      <div className="flex-1 md:ml-64">
        {/* Hamburger Menu Icon for Mobile */}
        <button
          className="md:hidden p-4 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar for Mobile */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 left-0 z-40 w-64 h-full bg-card text-card-foreground transform md:translate-x-0 md:static"
              >
                <div className="h-full px-3 py-4 overflow-y-auto">
                  <Link
                    href="/dashboard"
                    className="flex items-center pl-2.5 mb-5"
                  >
                    <span className="self-center text-xl font-semibold whitespace-nowrap">
                      Stream Loop
                    </span>
                  </Link>
                  <ul className="space-y-2 font-medium">
                    {menuItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                            pathname === item.href
                              ? "bg-gray-100 dark:bg-gray-700"
                              : ""
                          }`}
                        >
                          <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <item.icon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                          </motion.div>
                          <span className="ml-3">{item.label}</span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group justify-between"
                      >
                        <div className="flex items-center">
                          <Video className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                          <span className="ml-3">Streams</span>
                        </div>
                        {isDOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      {isDOpen && (
                        <ul className="pl-6 space-y-2">
                          <li>
                            <Link
                              href="/dashboard/streams/live"
                              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                              <Radio className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                              <span className="ml-3">Live</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/streams/new"
                              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                              <Plus className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                              <span className="ml-3">Start New</span>
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>

                <div className="absolute bottom-0 left-0 right-[0%] p-4">
                  <Link
                    href="/help"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <HelpCircle className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ml-3">Help & Support</span>
                  </Link>
                </div>
              </motion.aside>

              {/* Overlay for mobile sidebar */}
              <motion.div
                className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleSidebar}
                transition={{ duration: 0.3 }}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
