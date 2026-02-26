import { ElementType } from "react";
import { useDispatch } from "react-redux";

export default function AuthInput({
  Icon,
  placeholder,
  dir,
  value,
  onChangeHandler,
}: {
  Icon: ElementType;
  placeholder: string;
  dir: "rtl" | "ltr";
  value: string;
  onChangeHandler: Function;
}) {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex items-center shadow-xl shadow-black/10 rounded-xl relative">
      <input className="login" dir={dir} placeholder={placeholder} value={value} onChange={({ target }) => dispatch(onChangeHandler(target.value))} />
      <span className="w-[15%] h-full flex justify-center items-center absolute top-0 left-0 pointer-events-none">
        <Icon className="text-2xl" />
      </span>
    </div>
  );
}
