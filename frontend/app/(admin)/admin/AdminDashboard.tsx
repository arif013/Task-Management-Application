import Card from "@/app/components/Cards";
import Task from "@/types/task";
import User from "@/types/user";
import { LucideActivity, LucideUser } from "lucide-react";

function AdminDashboard({ tasks, users }: { tasks: Task[]; users: User[] }) {
  const taskCount = tasks.length;
  const userCount = users.length;
  //   console.log(`userCount`, userCount);
  return (
    <div className="px-[20px]">
      <div className="flex items-center justify-center py-[10px] bg-white rounded-[10px] mb-[10px]">
        <h1 className="text-[24px] font-bold">Dashboard</h1>
      </div>
      <div className="grid lg:grid-cols-4 gap-4">
        <Card title="Total Users" value={userCount} icon={<LucideUser />} />
        <Card title="Total Tasks" value={taskCount} icon={<LucideActivity />} />
      </div>
    </div>
  );
}

export default AdminDashboard;
