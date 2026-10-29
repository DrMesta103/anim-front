import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastAxiosError } from "@/shared/lib/toast";
import { LoginDataType } from "./types";

export const useSubmit = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.login.data);

  return async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk(data));
  };
};

export const loginThunk = createAsyncThunk("/login", async (data: LoginDataType) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, data, { withCredentials: true })
    .then((res) => {
      const token = res.data?.data?.token || res.data?.token;
      if (token && typeof document !== "undefined") {
        const isSecure = location.protocol === "https:";
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax${isSecure ? "; Secure" : ""}`;
      }
      return res.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false;
    });
});
