import Sidebar from "@/shared/components/layout/sidebar/Sidebar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      {children}
    </div>
  );
}
