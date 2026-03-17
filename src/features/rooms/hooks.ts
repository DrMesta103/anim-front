import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRoomsthunk = createAsyncThunk("/room/getall", async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch(() => false);
});
