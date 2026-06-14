import logout from "@/app/actions/logout";
export default function Logout() {
  return (
    <form action={logout}>
      <button className="px-[20px] py-[10px] w-full bg-red-500 text-white rounded-[10px]">
        Logout
      </button>
    </form>
  );
}
