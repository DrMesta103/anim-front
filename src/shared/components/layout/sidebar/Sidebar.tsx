"use client";

export default function Sidebar() {
  const menuItems = [
    { name: "داشبورد", active: true },
    { name: "تخصص ها", active: false },
    { name: "اتاق ها", active: false },
    { name: "دکتر ها", active: false },
    { name: "منشی ها", active: false },
  ];

  return (
    <div className="sticky hidden lg:block w-50 xl:w-72 bg-background min-h-screen">
      <aside className="w-50 xl:w-72 bg-white border-r border-accent flex flex-col p-6 fixed top-0 min-h-screen">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-text tracking-tight">رابین کلینیک</span>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <div key={item.name} className={`sidebar-item ${item.active ? "sidebar-item-active" : "sidebar-item-inactive"}`}>
              <div className={`w-2 h-2 rounded-full ${item.active ? "bg-white" : "bg-transparent border border-secondary"}`} />
              {item.name}
            </div>
          ))}
        </nav>

        <div className="pt-6 border-t border-background">
          <div className="flex items-center gap-3 px-2">
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
