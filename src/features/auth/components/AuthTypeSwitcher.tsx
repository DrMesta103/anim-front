import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthType } from "../authSlice";

export default function AuthTypeSwitcher() {
  const authType = useSelector((state: RootState) => state.auth.type);
  const dispatch = useDispatch();

  return (
    <div className="w-full rounded-xl flex items-center p-3 relative bg-background-secondary">
      <div className="auth_type_switcher" onClick={() => dispatch(setAuthType("login"))}>
        <span className="text-foreground">ورود</span>
      </div>
      <div className="auth_type_switcher" onClick={() => dispatch(setAuthType("register"))}>
        <span className="text-foreground">ثبت نام</span>
      </div>
      <div className="absolute z-10 w-full p-1 h-full inset-0 flex items-center">
        <div className={`bg-background w-1/2 h-full rounded-xl duration-300 ${authType === "login" ? "translate-x-0" : "-translate-x-full"}`}></div>
      </div>
    </div>
  );
}
