import Link from "next/link";
import {
  LucideActivity,
  LucideSquareDashedBottom,
  LucideUser,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import MobileLogout from "../components/MobileLogout";

const mobileNavItems = [
  {
    name: "Dashboard",
    link: "/admin/",
    icon: LucideSquareDashedBottom,
  },
  { name: "Manage Users", link: "/admin/manage-users", icon: LucideUser },
  { name: "Manage Tasks", link: "/admin/manage-tasks", icon: LucideActivity },
  // { name: "Settings", link: "/admin/settings", icon: LucideSettings },
];

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-purple-100 pb-20 md:pb-0">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-white z-50 mx-0 md:mx-[20px] my-0 md:my-[10px] rounded-none md:rounded-[10px] text-center flex items-center justify-center">
        <div>
          <h2 className="text-lg md:text-xl font-bold">Task Manager</h2>
          <p className="hidden md:block text-sm text-gray-500">
            Manage your work efficiently
          </p>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="fixed top-20 left-0 w-64 h-[calc(100vh-4rem)] border-r bg-white overflow-y-auto mx-[20px] my-[10px] rounded-[10px] hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 mt-16 p-4 md:p-6">{children}</main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t z-50 flex justify-around items-center py-2 px-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.link}
              href={item.link}
              className="flex flex-col items-center text-[10px] text-gray-500 hover:text-purple-600"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
        <MobileLogout />
      </nav>
    </div>
  );
}
