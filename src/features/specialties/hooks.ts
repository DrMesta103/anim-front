import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SpecialtyDataType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import MethodType from "@/shared/types/method.type";
import { toastAxiosError, toastAxiosSuccess } from "@/shared/lib/toast";

export const fetchAllSpecialtiesthunk = createAsyncThunk("/specialty/getall", async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/specialties`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch(() => false);
});

export const createSpecialtyThunk = createAsyncThunk("specialties/create", async (data: SpecialtyDataType) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/specialties`, data, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false;
    });
});

export const updateSpecialtyThunk = createAsyncThunk("specialties/update", async ({ id, data }: { id: string; data: SpecialtyDataType }) => {
  return await axios
    .patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/specialties/${id}`, data, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false;
    });
});

export const deleteSpecialtyThunk = createAsyncThunk("specialties/delete", async ({ id }: { id: string }) => {
  return await axios
    .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/specialties/${id}`, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false;
    });
});

export const useSubmitSpecialty = (method: MethodType) => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.specialty.data);
  const id = useSelector((state: RootState) => state.specialty.mode.id);

  return async (e: React.FormEvent) => {
    e.preventDefault();

    switch (method) {
      case "CREATE": {
        dispatch(createSpecialtyThunk(data));
        break;
      }
      case "UPDATE": {
        dispatch(updateSpecialtyThunk({ id, data }));
        break;
      }
      case "DELETE": {
        dispatch(deleteSpecialtyThunk({ id }));
        break;
      }
      case "READ": {
        dispatch(fetchAllSpecialtiesthunk());
        break;
      }
    }
  };
};
