import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RoomDataType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import MethodType from "@/shared/types/method.type";
import { toastAxiosError, toastAxiosSuccess } from "@/shared/lib/toast";

export const fetchAllRoomsThunk = createAsyncThunk("/room/getall", async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch(() => false);
});

export const createRoomThunk = createAsyncThunk("rooms/create", async (data: RoomDataType) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`, data, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false;
    });
});

export const updateRoomThunk = createAsyncThunk("rooms/update", async ({ id, data }: { id: string; data: RoomDataType }) => {
  return await axios
    .patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${id}`, data, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false;
    });
});

export const deleteRoomThunk = createAsyncThunk("rooms/delete", async ({ id }: { id: string }) => {
  return await axios
    .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${id}`, { withCredentials: true })
    .then((res) => {
      toastAxiosSuccess(res);
      return res.data.data;
    })
    .catch((err) => {
      toastAxiosError(err);
      return false;
    });
});

export const useSubmitRoom = (method: MethodType) => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.room.data);
  const id = useSelector((state: RootState) => state.room.mode.id);

  return async (e: React.FormEvent) => {
    e.preventDefault();

    switch (method) {
      case "CREATE": {
        dispatch(createRoomThunk(data));
        break;
      }
      case "UPDATE": {
        dispatch(updateRoomThunk({ id, data }));
        break;
      }
      case "DELETE": {
        dispatch(deleteRoomThunk({ id }));
        break;
      }
      case "READ": {
        dispatch(fetchAllRoomsThunk());
        break;
      }
    }
  };
};
