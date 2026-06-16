"use client";

import logout from "@/app/actions/logout";
import { useFormStatus } from "react-dom";
import { Loader2, LucideLogOut } from "lucide-react";

function MobileLogoutInner() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex flex-col items-center text-[10px] text-gray-500 hover:text-red-500 disabled:opacity-50"
    >
      {pending ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <LucideLogOut size={20} />
      )}
      <span>{pending ? "Logging out..." : "Logout"}</span>
    </button>
  );
}

export default function MobileLogout() {
  return (
    <form action={logout}>
      <MobileLogoutInner />
    </form>
  );
}
