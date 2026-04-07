import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SecretaryDataType } from "./types";
import { toastAxiosError, toastAxiosSuccess } from "@/shared/lib/toast";

export const fetchAllSecretariesthunk = createAsyncThunk("/secretary/getall", async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/secretaries`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch(() => false);
});

export const addSecretaryThunk = createAsyncThunk("/secretary/add", async (data: SecretaryDataType) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/secretary`, data, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false;
    });
});

export const updateSecretaryThunk = createAsyncThunk("/secretary/update", async ({ id, data }: { id: string; data: SecretaryDataType }) => {
  return await axios
    .patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/secretary/${id}`,
      { ...data, password: data.password.length === 0 ? null : data.password },
      { withCredentials: true },
    )
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false;
    });
});

export const deleteSecretaryThunk = createAsyncThunk("/secretary/delete", async (id: string) => {
  return await axios
    .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/secretary/${id}`, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch(() => false);
});
