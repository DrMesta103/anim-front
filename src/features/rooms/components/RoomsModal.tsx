"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setName, setDescription, setFloor, setIsActive, setMode, resetForm } from "../roomSlice";

export default function RoomsModal() {
  const dispatch: AppDispatch = useDispatch();
  const {
    mode,
    data: { name, description, floor, isActive },
  } = useSelector((state: RootState) => state.room);

  if (mode.method !== "CREATE" && mode.method !== "UPDATE") return null;

  const handleClose = () => {
    dispatch(setMode({ id: "", method: "READ", title: "" }));
    dispatch(resetForm());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2F3E46]/40 backdrop-blur-sm transition-opacity">
      <div
        dir="rtl"
        className="relative w-full max-w-[450px] bg-white rounded-[24px] shadow-[0_15px_40px_rgba(47,62,70,0.15)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F4F2]">
          <h3 className="text-lg font-bold text-text">{mode.method === "UPDATE" ? "ویرایش اتاق" : "افزودن اتاق"}</h3>
          <button
            onClick={handleClose}
            className="p-2 text-secondary hover:text-text bg-transparent hover:bg-[#F0F4F2] rounded-xl transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form className="flex flex-col p-6 gap-5">
          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-secondary">نام اتاق</label>
            <input
              type="text"
              value={name}
              onChange={({ target }) => dispatch(setName(target.value))}
              placeholder="مثال: اتاق عمل ۱"
              required
              className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text 
                         focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                         transition-all duration-200 text-sm placeholder:text-gray-300"
            />
          </div>

          {/* Floor & Status Row */}
          <div className="flex gap-4">
            {/* Floor Input */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold text-secondary">طبقه</label>
              <input
                type="number"
                value={floor}
                onChange={({ target }) => dispatch(setFloor(target.value === "" ? "" : Number(target.value)))}
                placeholder="مثال: 1"
                required
                className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text 
                           focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                           transition-all duration-200 text-sm placeholder:text-gray-300"
              />
            </div>

            {/* Status Select */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold text-secondary">وضعیت</label>
              <select
                value={isActive ? "true" : "false"}
                onChange={({ target }) => dispatch(setIsActive(target.value === "true"))}
                className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text 
                           focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                           transition-all duration-200 text-sm appearance-none"
              >
                <option value="true">فعال</option>
                <option value="false">غیر فعال</option>
              </select>
            </div>
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-secondary">توضیحات</label>
            <textarea
              value={description}
              onChange={({ target }) => dispatch(setDescription(target.value))}
              placeholder="توضیحات مربوط به اتاق را وارد کنید..."
              rows={3}
              className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text resize-none
                         focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                         transition-all duration-200 text-sm placeholder:text-gray-300"
            />
          </div>

          {/* Footer / Actions */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#F0F4F2]">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-[10px] bg-[#F0F4F2] text-text font-bold text-sm 
                         hover:bg-[#CAD2C5]/50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-[10px] bg-primary text-white font-bold text-sm 
                         hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              ثبت اطلاعات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
