"use client";

import AuthLogo from "@/shared/components/layout/AuthLogo";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center pt-5 px-[5%] gap-2 mb-6">
      <div className="w-1/2 flex items-end gap-3">
        <div className="w-[30%]">
          <AuthLogo className="text-xl" />
        </div>
        <div className="w-[70%] flex flex-col items-start gap-1">
          <span className="opacity-50 text-xs">سلام،</span>
          <span className="text-lg">جناب ایزدی</span>
        </div>
      </div>
      <div className="w-1/2 flex items-end justify-end gap-3">
        <div className="w-[22.5%] bg-white rounded-lg aspect-square flex justify-center items-center">
          <IoPersonOutline className="text-xl" />
        </div>
        <div className="w-[22.5%] bg-white rounded-lg aspect-square flex justify-center items-center">
          <IoIosNotificationsOutline className="text-2xl" />
        </div>
      </div>
    </nav>
  );
}
