"use client";

import { useSelector } from "react-redux";
import AuthTypeSwitcher from "./AuthTypeSwitcher";
import { RootState } from "@/store";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthForm() {
  const authType = useSelector((state: RootState) => state.auth.type);

  return (
    <div className="w-[85%] flex flex-col items-center gap-8">
      <AuthTypeSwitcher />
      {authType === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
