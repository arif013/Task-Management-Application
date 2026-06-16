import { fetchWithAuth } from "@/app/lib/api";
import AdminDashboard from "./AdminDashboard";

async function page() {
  let userData, taskData;
  try {
    const resTasks = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/all-tasks`,
      {
        method: "GET",
      },
    );
    if (!resTasks?.ok) {
      console.error("Error while fetching all the tasks from Admin!!");
      return null;
    }
    taskData = await resTasks.json();
    // console.log(`data`, taskData);

    const resUsers = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/all-users`,
      {
        method: "GET",
      },
    );
    if (!resUsers?.ok) {
      console.error("Error while fetching all the Users from Admin!!");
      return null;
    }
    userData = await resUsers.json();
    // console.log(`userData1`,userData)
  } catch (error) {
    console.error("Error in running!!", error);
  }
  return <AdminDashboard tasks={taskData.data} users={userData.data} />;
}

export default page;
