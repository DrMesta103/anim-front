import StatusType from "@/shared/types/status.type";
import ModeType from "@/shared/types/mode.type";

export interface Secretary {
  id: string;
  username: string;
  phone: string;
  firstname: string;
  lastname: string;
  role: "secretary";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SecretaryDataType {
  username: string;
  password: string;
  phone: string;
  firstname: string;
  lastname: string;
}

export interface SecretaryState {
  status: StatusType;
  secretaries: Secretary[];
  search: string;
  mode: ModeType;
  data: SecretaryDataType;
}
