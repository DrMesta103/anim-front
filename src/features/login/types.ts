export interface LoginDataType {
  username: string;
  password: string;
}
export interface LoginState {
  status: "idle" | "loading" | "success" | "error";
  data: LoginDataType;
}
