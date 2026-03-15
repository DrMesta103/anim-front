import Dashboard from "@/features/admin_panel/components/Dashboard";
import Rooms from "@/features/rooms/components/Rooms";
import Specialties from "@/features/specialties/components/Specialties";
import AdminHeader from "@/shared/components/layout/admin_panel/AdminHeader";
import AdminSidebar from "@/shared/components/layout/admin_panel/AdminSidebar";

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-10 overflow-y-auto min-w-0">
        <AdminHeader />
        <Dashboard />
        {/* <Specialties /> */}
        {/* <Rooms /> */}
      </main>
    </div>
  );
}
