import AuthInput from "@/shared/components/ui/AuthInput";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { setPhone } from "../authSlice";

export default function LoginForm() {
  const phone = useSelector((state: RootState) => state.auth.data.phone);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <AuthInput Icon={MdOutlineLocalPhone} placeholder="شماره موبایل" dir="ltr" value={phone} onChangeHandler={setPhone} />
      <button className="auth_button">
        ارسال کد تایید <IoIosArrowBack />
      </button>
    </div>
  );
}
