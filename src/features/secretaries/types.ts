import StatusType from "@/shared/types/status.type";

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

export interface SecretaryState {
  status: StatusType;
  secretaries: Secretary[];
  search: string;
}
