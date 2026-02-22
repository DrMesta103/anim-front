import { ElementType } from "react";

export default function AuthInput({ Icon, placeholder, dir }: { Icon: ElementType; placeholder: string; dir: "rtl" | "ltr" }) {
  return (
    <div className="w-full flex items-center bg-white border border-gray-300 rounded-xl relative">
      <input className="login" dir={dir} placeholder={placeholder} />
      <span className="w-[15%] h-full flex justify-center items-center absolute top-0 left-0 pointer-events-none">
        <Icon className="text-2xl" />
      </span>
    </div>
  );
}
