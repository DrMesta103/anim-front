import StatusType from "@/shared/types/status.type";

export interface Room {
  id: number;
  name: string;
  description: string;
  floor: number;
  isActive: boolean;
}

export interface RoomState {
  status: StatusType;
  rooms: Room[];
  search: string;
}
