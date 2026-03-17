import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, RoomState } from "./types";
import { fetchAllRoomsthunk } from "./hooks";
import StatusType from "@/shared/types/status.type";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";

const initialState: RoomState = {
  status: "idle",
  rooms: [],
  search: "",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = convertToEnglishDigits(action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllRoomsthunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllRoomsthunk.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.status = "success";
        if (action.payload) {
          state.rooms = [...action.payload];
        }
      })
      .addCase(fetchAllRoomsthunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const { setSearch, setStatus } = roomSlice.actions;
export default roomSlice.reducer;
