import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const toastAxiosError = (err: any) => {
  toast.error(err.response?.data?.message || "مشکلی پیش آمده لطفا دوباره امتحان کنید");
};
