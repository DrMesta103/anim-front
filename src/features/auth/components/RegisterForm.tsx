import AuthInput from "@/shared/components/ui/AuthInput";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

export default function RegisterForm() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AuthInput Icon={MdDriveFileRenameOutline} placeholder="نام" dir="ltr" />
      <AuthInput Icon={MdDriveFileRenameOutline} placeholder="نام خانوادگی" dir="ltr" />
      <AuthInput Icon={MdOutlineLocalPhone} placeholder="شماره موبایل" dir="ltr" />
    </div>
  );
}
