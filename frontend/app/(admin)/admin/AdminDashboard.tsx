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
      <h1>Dashboard</h1>
      <div className="grid lg:grid-cols-4 gap-4">
        <Card title="Total Users" value={userCount} icon={<LucideUser />} />
        <Card title="Total Tasks" value={taskCount} icon={<LucideActivity />} />
      </div>
    </div>
  );
}

export default AdminDashboard;
