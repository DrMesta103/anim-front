"use client";

import { secretaryPanelComponentsMap } from "@/features/secretary_panel/constants";
import SecretaryHeader from "@/shared/components/layout/secretary_panel/Header";
import SecretaryNavbar from "@/shared/components/layout/secretary_panel/Navbar";
import SecretarySidebar from "@/shared/components/layout/secretary_panel/Sidebar";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function AdminPanel() {
  const selectedTab = useSelector((state: RootState) => state.secretaryPanel.selectedTab);
  const TabComponent = secretaryPanelComponentsMap[selectedTab].component;

  return (
    <div className="min-h-screen bg-background flex">
      <SecretarySidebar />
      <SecretaryNavbar />
      <main className="flex-1 p-4 mt-[65px] lg:mt-0 md:p-10 overflow-y-auto min-w-0">
        <SecretaryHeader />
        <TabComponent />
      </main>
    </div>
  );
}
