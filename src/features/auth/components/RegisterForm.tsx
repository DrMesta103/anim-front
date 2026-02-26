import AuthInput from "@/shared/components/ui/AuthInput";
import { RootState } from "@/store";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { setFirstname, setLastname, setPhone } from "../authSlice";

export default function RegisterForm() {
  const { firstname, lastname, phone } = useSelector((state: RootState) => state.auth.data);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AuthInput Icon={MdDriveFileRenameOutline} placeholder="نام" dir="ltr" value={firstname} onChangeHandler={setFirstname} />
      <AuthInput Icon={MdDriveFileRenameOutline} placeholder="نام خانوادگی" dir="ltr" value={lastname} onChangeHandler={setLastname} />
      <AuthInput Icon={MdOutlineLocalPhone} placeholder="شماره موبایل" dir="ltr" value={phone} onChangeHandler={setPhone} />
      <button className="auth_button">
        ارسال کد تایید <IoIosArrowBack />
      </button>
    </div>
  );
}
