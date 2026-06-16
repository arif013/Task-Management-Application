"use server";
import { fetchWithAuth } from "@/app/lib/api";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  // const [taskCount, setTaskCount] = useState(0);
  let taskCount;
  let tasks
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,
      {
        method: "GET",
      },
    );
    const data = await res?.json();
    // console.log(`data`, data.tasks);
    tasks = data.tasks;
    // taskCount = tasks.length

    // console.log(`task count`, taskCount)
  } catch (error) {
    console.error(`Error:`, error);
  }

  return (
    // <div className="mx-[10px] bg-white h-screen rounded-[10px] py-[10px] px-[10px]">
    //   {taskCount}
    // </div>
    // <div></div>
    <DashboardClient tasks={tasks} />
  );
}
