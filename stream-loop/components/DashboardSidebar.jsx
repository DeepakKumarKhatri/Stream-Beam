"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  BarChart2,
  Settings,
  Video,
  Users,
  Calendar,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Video, label: "Streams", href: "/dashboard/streams" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Audience", href: "/audience" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card text-card-foreground">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <Link href="/dashboard" className="flex items-center pl-2.5 mb-5">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            Stream Loop
          </span>
        </Link>
        <ul className="space-y-2 font-medium">
          {menuItems.map((item, index) => (
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
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 right-[80%] p-4">
        <Link
          href="/help"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <HelpCircle className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="ml-3">Help & Support</span>
        </Link>
      </div>
    </aside>
  );
}
