import { fetchWithAuth } from "@/app/lib/api";
import ManageTaskClient from "./ManageTaskClient";

export const dynamic = "force-dynamic";

async function Page() {
  let tasksData;
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/all-tasks`,
      {
        method: "GET",
      },
    );
    if (!res?.ok) {
      console.log("Could not get tasks in admin");
      return null;
    }
    tasksData = await res.json();
  } catch (error) {
    console.error("Error fetching admin tasks:", error);
  }
  return (
    <div>
      <div className="flex items-center justify-center py-[10px] bg-white rounded-[10px] mb-[10px]">
        <h1 className="text-[24px] font-bold">Manage Tasks</h1>
      </div>
      <ManageTaskClient tasks={tasksData?.data ?? []} />
    </div>
  );
}

export default Page;
