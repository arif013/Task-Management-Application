"use client";

import logout from "@/app/actions/logout";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

function LogoutButtonInner() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 px-[20px] py-[10px] w-full bg-red-500 text-white rounded-[10px] disabled:opacity-60"
    >
      {pending && <Loader2 size={18} className="animate-spin" />}
      {pending ? "Logging out..." : "Logout"}
    </button>
  );
}

export default function Logout() {
  return (
    <form action={logout}>
      <LogoutButtonInner />
    </form>
  );
}
