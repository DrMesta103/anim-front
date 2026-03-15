"use client";

import { useDispatch, useSelector } from "react-redux";
import { useSubmit } from "../hooks";
import { AppDispatch, RootState } from "@/store";
import { setPassword, setUsername } from "../loginSlice";
import { useEffect } from "react";

export default function LoginClient() {
  const submit = useSubmit();
  const data = useSelector((state: RootState) => state.login.data);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    document.getElementById("username")?.focus();
  }, []);

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-semibold text-text mr-1">
          نام کاربری
        </label>
        <input
          id="username"
          value={data.username}
          onChange={({ target }) => dispatch(setUsername(target.value))}
          placeholder="ali.jafari"
          className="login_input"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <label htmlFor="password" className="text-sm font-semibold text-text">
            رمز عبور
          </label>
          <button type="button" tabIndex={-1} className="text-xs font-bold text-primary hover:opacity-80 transition-opacity">
            فراموشی رمز؟
          </button>
        </div>
        <input
          id="password"
          value={data.password}
          onChange={({ target }) => dispatch(setPassword(target.value))}
          placeholder="••••••••"
          className="login_input"
          required
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
      >
        ورود به سیستم
      </button>
    </form>
  );
}
