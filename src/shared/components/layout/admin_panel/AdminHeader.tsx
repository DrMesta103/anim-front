"use client";

import { adminPanelComponentsMap } from "@/features/admin_panel/constants";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function AdminHeader() {
  const selectedTab = useSelector((state: RootState) => state.admin.selectedTab);

  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-text tracking-tight">{adminPanelComponentsMap[selectedTab].header}</h1>
      <div className="flex gap-4">
        <button className="bg-white p-3 rounded-xl border border-accent/20 text-text hover:bg-accent/10 transition-colors shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
