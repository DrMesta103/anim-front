import AuthLogo from "@/shared/components/layout/AuthLogo";
import AuthTexts from "@/features/auth/components/AuthTexts";
import { ReduxProvider } from "../../reduxProvider";
import AuthForm from "@/features/auth/components/AuthForm";

export default function AuthPage() {
  return (
    <main className="w-full h-screen" style={{ backgroundImage: "url('/images/auth/background.jpg')" }}>
      <div className="w-full h-full flex justify-center items-center bg-transparent backdrop-blur-sm">
        <form className="w-[95%] flex flex-col items-center gap-8 rounded-xl bg-background py-8">
          <div className="w-[20%]">
            <AuthLogo className="text-3xl" />
          </div>
          <AuthTexts />
          <ReduxProvider>
            <AuthForm />
          </ReduxProvider>
        </form>
      </div>
    </main>
  );
}
