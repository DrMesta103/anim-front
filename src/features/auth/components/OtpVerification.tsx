import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { removeOtp, setOtp } from "../authSlice";

export default function OtpVerification() {
  const dispatch: AppDispatch = useDispatch();
  const authType = useSelector((state: RootState) => state.auth.type);
  const otp = useSelector((state: RootState) => state.auth.data.otp);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      dispatch(removeOtp(index));
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full flex justify-between items-center gap-3 otp_container" dir="ltr">
        {new Array(4).fill(0).map((_, index) => (
          <input
            id={`otp_${index}`}
            key={index}
            value={otp[index]}
            onChange={({ target }) => dispatch(setOtp({ index, value: target.value }))}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      <button className="auth_button">{authType === "login" ? "ورود به دُرما" : "ثبت نام در دُرما"}</button>
    </div>
  );
}
