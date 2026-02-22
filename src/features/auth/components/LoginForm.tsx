import AuthInput from "@/shared/components/ui/AuthInput";
import { MdOutlineLocalPhone } from "react-icons/md";

export default function LoginForm() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <AuthInput Icon={MdOutlineLocalPhone} placeholder="شماره موبایل" dir="ltr" />
    </div>
  );
}
