"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setNavbarOpen, setSelectedTab } from "@/features/admin_panel/adminSlice";
import { adminPanelComponentsMap } from "@/features/admin_panel/constants";

export default function AdminNavbar() {
  const dispatch: AppDispatch = useDispatch();
  const { selectedTab, isNavbarOpen } = useSelector((state: RootState) => state.admin);

  const handleTabClick = (name: any) => {
    dispatch(setSelectedTab(name));
    dispatch(setNavbarOpen(false));
  };

  return (
    <div className="lg:hidden">
      <div className="fixed top-0 left-0 w-full flex items-center justify-between bg-white border-b border-accent px-4 py-3 shadow-sm z-30">
        <button onClick={() => dispatch(setNavbarOpen(true))} className="p-2 text-text focus:outline-none rounded-md hover:bg-background">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-text">رابین کلینیک</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent" />
      </div>
      {isNavbarOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => dispatch(setNavbarOpen(false))} />}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isNavbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-background">
          <span className="text-lg font-bold text-text tracking-tight">منوی مدیریت</span>
          <button onClick={() => dispatch(setNavbarOpen(false))} className="p-2 text-secondary hover:text-text hover:bg-background rounded-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-2 flex-1 p-4 overflow-y-auto">
          {Object.values(adminPanelComponentsMap).map((item) => (
            <div
              key={item.title}
              onClick={() => handleTabClick(item.name)}
              className={`sidebar-item cursor-pointer ${item.name === selectedTab ? "sidebar-item-active" : "sidebar-item-inactive"}`}
            >
              <div className={`w-2 h-2 rounded-full ${item.name === selectedTab ? "bg-white" : "bg-transparent border border-secondary"}`} />
              {item.title}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-background">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text">پویا دفاعی</span>
              <span className="text-[10px] text-secondary">مدیر</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
