'use server'
import { redirect } from "next/navigation";
import MyTaskClient from "./MyTaskClient";
import { fetchWithAuth } from "@/app/lib/api";

export default async function MyTask() {
  const fetchTasks = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,
  );
  if (!fetchTasks) {
    redirect("/login");
  }
  if (!fetchTasks.ok) {
    throw new Error(`Failed to fetch tasks: ${fetchTasks.status}`);
  }
  const tasks = await fetchTasks.json();
  const alltasks = tasks.tasks ?? [];
  //   console.log('all tasks ',alltasks)

  return <MyTaskClient myTasks={alltasks} />;
}
