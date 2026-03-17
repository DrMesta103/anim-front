import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllSecretariesthunk = createAsyncThunk("/secretary/getall", async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users/secretaries`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch(() => false);
});
