import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, RoomState } from "./types";
import { fetchAllRoomsThunk, createRoomThunk, updateRoomThunk, deleteRoomThunk } from "./hooks";
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
    refreshData: (state) => {
      state.data = initialData;
    },
    refreshState: (state) => {
      state.data = initialData;
      state.mode = initialMode;
      state.rooms = [];
      state.status = "idle";
      state.search = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllRoomsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllRoomsThunk.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.status = "success";
        if (action.payload) {
          state.rooms = [...action.payload];
        }
      })
      .addCase(fetchAllRoomsThunk.rejected, (state) => {
        state.status = "error";
      })

      .addCase(createRoomThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
        state.status = "success";
        if (action.payload) {
          state.rooms = [...state.rooms, action.payload];
          state.data = initialData;
          state.mode = initialMode;
        }
      })
      .addCase(createRoomThunk.rejected, (state) => {
        state.status = "error";
      })

      .addCase(updateRoomThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
        state.status = "success";
        if (action.payload) {
          state.rooms = state.rooms.map((room) => (room.id === action.payload.id ? action.payload : room));
          state.data = initialData;
          state.mode = initialMode;
        }
      })
      .addCase(updateRoomThunk.rejected, (state) => {
        state.status = "error";
      })

      .addCase(deleteRoomThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRoomThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "success";
        if (action.payload) {
          state.rooms = state.rooms.filter((room) => room.id !== action.payload);
          state.data = initialData;
          state.mode = initialMode;
        }
      })
      .addCase(deleteRoomThunk.rejected, (state) => {
        state.status = "error";
      }),
});

export const { setSearch, setStatus, setMode, setName, setDescription, setFloor, setIsActive, refreshData, refreshState } = roomSlice.actions;
export default roomSlice.reducer;
