import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PatientDataType, FetchPatientsParams, FetchPatientsResponse } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import MethodType from "@/shared/types/method.type";
import { toastAxiosError, toastAxiosSuccess } from "@/shared/lib/toast";
import { useCallback } from "react";

const BASE = `${process.env.NEXT_PUBLIC_BACKEND_URL}/secretary/patients`;
const LIMIT = 1;

export const fetchPatientsThunk = createAsyncThunk("patients/fetch", async (params: FetchPatientsParams) => {
  return await axios
    .get(BASE, {
      params,
      withCredentials: true,
    })
    .then((res): FetchPatientsResponse => res.data.data)
    .catch(() => false as const);
});

export const fetchMorePatientsThunk = createAsyncThunk("patients/fetchMore", async (params: FetchPatientsParams) => {
  return await axios
    .get(BASE, {
      params,
      withCredentials: true,
    })
    .then((res): FetchPatientsResponse => res.data.data)
    .catch(() => false as const);
});

export const createPatientThunk = createAsyncThunk("patients/create", async (data: PatientDataType) => {
  return await axios
    .post(BASE, { ...data, email: data.email?.length === 0 ? null : data.email }, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false as const;
    });
});

export const updatePatientThunk = createAsyncThunk("patients/update", async ({ id, data }: { id: string; data: PatientDataType }) => {
  return await axios
    .patch(`${BASE}/${id}`, { ...data, email: data.email?.length === 0 ? null : data.email }, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false as const;
    });
});

export const deletePatientThunk = createAsyncThunk("patients/delete", async ({ id }: { id: string }) => {
  return await axios
    .delete(`${BASE}/${id}`, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return id;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false as const;
    });
});

// ---- hook ----

export const useSubmitPatient = (method: MethodType) => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.patient.data);
  const id = useSelector((state: RootState) => state.patient.mode.id);
  const search = useSelector((state: RootState) => state.patient.search);

  return async (e?: React.FormEvent) => {
    e?.preventDefault();

    switch (method) {
      case "CREATE":
        dispatch(createPatientThunk(data));
        break;
      case "UPDATE":
        dispatch(updatePatientThunk({ id, data }));
        break;
      case "DELETE":
        dispatch(deletePatientThunk({ id }));
        break;
      case "READ":
        dispatch(fetchPatientsThunk({ limit: LIMIT, offset: 0, search }));
        break;
    }
  };
};

export const useFetchMorePatients = () => {
  const dispatch: AppDispatch = useDispatch();
  const { patients, search, status, hasMore } = useSelector((state: RootState) => state.patient);

  return useCallback(() => {
    if (status === "loading" || !hasMore) return;
    dispatch(fetchMorePatientsThunk({ limit: LIMIT, offset: patients.length, search }));
  }, [status, patients.length, search]);
};
