"use client";

import { setSelectedTab } from "@/features/secretary_panel/slice";
import { secretaryPanelComponentsMap } from "@/features/secretary_panel/constants";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import RobinLogo from "../../ui/RobinLogo";

export default function SecretarySidebar() {
  const dispatch: AppDispatch = useDispatch();
  const selectedTab = useSelector((state: RootState) => state.secretaryPanel.selectedTab);

  return (
    <div className="sticky hidden lg:block w-56 xl:w-72 bg-background min-h-screen">
      <aside className="w-56 xl:w-72 bg-white border-r border-accent flex flex-col p-6 fixed top-0 min-h-screen">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md">
            <RobinLogo />
          </div>
          <span className="text-xl font-bold text-text tracking-tight">رابین کلینیک</span>
        </div>

        <nav className="space-y-2 flex-1">
          {Object.values(secretaryPanelComponentsMap).map((item) => (
            <div
              key={item.title}
              onClick={() => dispatch(setSelectedTab(item.name as any))}
              className={`sidebar-item ${item.name === selectedTab ? "sidebar-item-active" : "sidebar-item-inactive"}`}
            >
              <div className={`w-2 h-2 rounded-full ${item.name === selectedTab ? "bg-white" : "bg-transparent border border-secondary"}`} />
              {item.title}
            </div>
          ))}
        </nav>

        <div className="pt-6 border-t border-background">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-accent" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text">پویا دفاعی</span>
              <span className="text-[10px] text-secondary">منشی</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
