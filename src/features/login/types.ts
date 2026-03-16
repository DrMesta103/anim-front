import StatusType from "@/shared/types/status.type";

export interface LoginDataType {
  username: string;
  password: string;
}
export interface LoginState {
  status: StatusType;
  data: LoginDataType;
}
