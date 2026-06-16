"use client";

import {
  LucideActivity,
  LucideSettings,
  LucideSquareDashedBottom,
  LucideUser,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "@/app/components/LogoutButton";

const navItems = [
  {
    name: "Dashboard",
    link: "/admin",
    icon: LucideSquareDashedBottom,
  },
  {
    name: "Manage Users",
    link: "/admin/manage-users",
    icon: LucideUser,
  },
  {
    name: "Manage Tasks",
    link: "/admin/manage-tasks",
    icon: LucideActivity,
  },
  // {
  //   name: "Settings",
  //   link: "/admin/settings",
  //   icon: LucideSettings,
  // },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 bg-white border-r px-4 py-6">
      <div className="flex flex-col justify-between h-full">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.link;

            return (
              <Link
                key={item.link}
                href={item.link}
                className={`
                flex items-center gap-3 rounded-lg px-4 py-3
                transition-all duration-200
                ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }
              `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <Logout/>
      </div>
    </aside>
  );
}
