import { fetchWithAuth } from "@/app/lib/api";
import ManageUsersClient from "./ManageUsersClient";

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
      <h1>Maange Users</h1>
      <ManageUsersClient users={userData.data} />
    </div>
  );
}

export default page;
