import { ReduxProvider } from "@/app/reduxProvider";
import LoginClient from "@/features/login/components/LoginClient";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(47,62,70,0.1)]">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4"></div>
          <h1 className="text-2xl font-bold text-text tracking-tight">خوش‌آمدید</h1>
          <p className="text-secondary text-sm mt-1 text-center">لطفاً اطلاعات کاربری خود را وارد کنید</p>
        </div>
        <ReduxProvider>
          <LoginClient />
        </ReduxProvider>
        <div className="mt-10 text-center">
          <p className="text-xs text-secondary leading-relaxed">
            توسعه و پیاده سازی توسط: <br />
            <span className="text-primary font-bold cursor-pointer hover:underline">پویا دفاعی</span>
          </p>
        </div>
      </div>
    </div>
  );
}
