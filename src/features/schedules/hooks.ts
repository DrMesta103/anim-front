import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllGroupsOfSpecialtiesThunk = createAsyncThunk("/schedules/specialties/getall", async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/secretary/specialties`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch(() => false);
});
