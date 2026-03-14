export interface AuthState {
  type: "login" | "register";
  status: "idle" | "loading" | "success" | "error";
  data: {
    firstname: string;
    lastname: string;
    phone: string;
    otp: string[];
  };
  isCodeSent: boolean;
}
