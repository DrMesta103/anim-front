"use client";

import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { resetSecretaryForm } from "../secretarySlice";
import { fetchAllSecretariesthunk } from "../hooks";
// Import your delete thunk here if you have one

export default function SecretariesDeleteAlert() {
  const dispatch: AppDispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.secretary);

  // @ts-ignore
  if (mode.method !== "DELETE") return null;

  const handleDelete = async () => {
    if (mode.id) {
      // await dispatch(deleteSecretaryThunk(mode.id as string));
      console.log("Delete secretary", mode.id);
      dispatch(fetchAllSecretariesthunk());
      dispatch(resetSecretaryForm());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2F3E46]/40 backdrop-blur-sm transition-opacity">
      <div
        dir="rtl"
        className="w-full max-w-[400px] bg-white rounded-[24px] shadow-[0_15px_40px_rgba(47,62,70,0.15)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text">حذف منشی</h3>
          <p className="text-sm text-secondary leading-relaxed">آیا از حذف این منشی اطمینان دارید؟ این عملیات غیر قابل بازگشت است.</p>
        </div>

        <div className="flex items-center gap-3 p-6 pt-0">
          <button
            onClick={() => dispatch(resetSecretaryForm())}
            className="flex-1 px-4 py-3 rounded-[12px] bg-[#F0F4F2] text-text font-bold text-sm hover:bg-[#CAD2C5]/50 transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-3 rounded-[12px] bg-error text-white font-bold text-sm hover:bg-error/90 transition-colors shadow-md shadow-error/20"
          >
            بله، حذف شود
          </button>
        </div>
      </div>
    </div>
  );
}
