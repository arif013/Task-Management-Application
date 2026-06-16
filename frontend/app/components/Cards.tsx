import React from "react";
import { Users } from "lucide-react";

interface CardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
}

function Card({ title, value, icon }: CardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {/* {value.toLocaleString()} */}
            {value}
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Card;