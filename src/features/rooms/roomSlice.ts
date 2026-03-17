import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, RoomState } from "./types";
import { fetchAllRoomsthunk } from "./hooks";
import StatusType from "@/shared/types/status.type";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";
import { initialMode } from "@/shared/constants/mode.constant";
import ModeType from "@/shared/types/mode.type";

const initialData: (typeof initialState)["data"] = {
  name: "",
  description: "",
  floor: "",
  isActive: true,
};

const initialState: RoomState = {
  status: "idle",
  rooms: [],
  search: "",
  data: initialData,
  mode: initialMode,
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
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.data.name = convertToEnglishDigits(action.payload);
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.data.description = convertToEnglishDigits(action.payload);
    },
    setFloor: (state, action: PayloadAction<number | "">) => {
      state.data.floor = action.payload;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.data.isActive = action.payload;
    },
    resetForm: (state) => {
      state.data = initialData;
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

export const { setSearch, setStatus, setMode, setName, setDescription, setFloor, setIsActive, resetForm } = roomSlice.actions;
export default roomSlice.reducer;
