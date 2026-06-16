import Card from "@/app/components/Cards";
import Task from "@/types/task";
import { LucideActivity } from "lucide-react";

function DashboardClient({ tasks }: { tasks: Task[] }) {
  const taskCount = tasks.length;
  const pendingTask = tasks.filter((item) => (item.status === "Pending")).length
  const completedTasks = tasks.filter(
    (item) => (item.status === "Completed"),
  ).length;
  return (
    <div className="grid lg:grid-cols-4 gap-4">
      <Card title="Total Tasks" value={taskCount} icon=<LucideActivity /> />
      <Card title="Pending Tasks" value={pendingTask} icon=<LucideActivity /> />
      <Card title="Completed Tasks" value={completedTasks} icon=<LucideActivity /> />
    </div>
  );
}

export default DashboardClient;
