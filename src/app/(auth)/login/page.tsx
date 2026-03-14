"use client";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(47,62,70,0.1)]">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text tracking-tight">خوش‌آمدید</h1>
          <p className="text-secondary text-sm mt-1 text-center">لطفاً اطلاعات کاربری خود را وارد کنید</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-semibold text-text mr-1">
              نام کاربری
            </label>
            <input id="username" type="text" placeholder="ali.jafari" className="login_input" required />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label htmlFor="password" className="text-sm font-semibold text-text">
                رمز عبور
              </label>
              <button type="button" className="text-xs font-bold text-primary hover:opacity-80 transition-opacity">
                فراموشی رمز؟
              </button>
            </div>
            <input id="password" type="password" placeholder="••••••••" className="login_input" required />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            ورود به سیستم
          </button>
        </form>
        <div className="mt-10 text-center">
          <p className="text-xs text-secondary leading-relaxed">
            حساب کاربری ندارید یا دسترسی خود را گم کرده‌اید؟ <br />
            <span className="text-primary font-bold cursor-pointer hover:underline">با مدیر سیستم تماس بگیرید</span>
          </p>
        </div>
      </div>
    </div>
  );
}
