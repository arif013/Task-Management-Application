import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <Loader2 size={36} className="animate-spin text-purple-600" />
    </div>
  );
}
