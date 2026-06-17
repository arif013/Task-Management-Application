import { fetchWithAuth } from "@/app/lib/api";
import ManageUsersClient from "./ManageUsersClient";

export const dynamic = "force-dynamic";

async function page() {
  let userData;
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/all-users`,
      {
        method: "GET",
      },
    );
    if (!res?.ok) {
      console.log("Could not get users in admin");
      return null;
    }
    userData = await res.json();
    // console.log(`user data`, userData);
  } catch (error) {
    console.error("Error in running!!", error);
  }
  return (
    <div>
      <div className="flex items-center justify-center py-[10px] bg-white rounded-[10px] mb-[10px]">
        <h1 className="text-[24px] font-bold">Manage Users</h1>
      </div>
      <ManageUsersClient users={userData.data} />
    </div>
  );
}

export default page;
