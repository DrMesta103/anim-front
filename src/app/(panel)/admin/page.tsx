"use client";

import { adminPanelComponentsMap } from "@/features/admin_panel/constants";
import AdminHeader from "@/shared/components/layout/admin_panel/Header";
import AdminNavbar from "@/shared/components/layout/admin_panel/Navbar";
import AdminSidebar from "@/shared/components/layout/admin_panel/Sidebar";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function AdminPanel() {
  const selectedTab = useSelector((state: RootState) => state.admin.selectedTab);
  const TabComponent = adminPanelComponentsMap[selectedTab].component;

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <AdminNavbar />
      <main className="flex-1 p-4 mt-[65px] lg:mt-0 md:p-10 overflow-y-auto min-w-0">
        <AdminHeader />
        <TabComponent />
      </main>
    </div>
  );
}
