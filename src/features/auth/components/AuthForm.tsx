"use client";

import { useSelector } from "react-redux";
import AuthTypeSwitcher from "./AuthTypeSwitcher";
import { RootState } from "@/store";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OtpVerification from "./OtpVerification";

export default function AuthForm() {
  const authType = useSelector((state: RootState) => state.auth.type);
  const isCodeSent = useSelector((state: RootState) => state.auth.isCodeSent);

  return (
    <div className="w-[85%] flex flex-col items-center gap-12">
      {isCodeSent ? (
        <OtpVerification />
      ) : (
        <>
          <AuthTypeSwitcher />
          {authType === "login" ? <LoginForm /> : <RegisterForm />}
        </>
      )}
    </div>
  );
}
