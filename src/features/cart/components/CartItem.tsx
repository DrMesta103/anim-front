import { RiDeleteBinLine } from "react-icons/ri";

export default function CartItem() {
  return (
    <div className="w-full rounded-xl bg-white flex items-center justify-between p-2 h-20">
      <div className="w-2/3 flex justify-between items-center gap-1.5"></div>
      <div className="w-1/3 flex flex-col justify-between items-center">
        <div className="w-full flex items-center justify-end">
          <span className="text-lg text-error">
            <RiDeleteBinLine />
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
}
