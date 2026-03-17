"use client";

import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { resetDoctorForm } from "../doctorSlice";
import { deleteDoctorThunk, fetchAllDoctorsthunk } from "../hooks";

export default function DoctorsDeleteAlert() {
  const dispatch: AppDispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.doctor);
  const isOpen = mode.method === "DELETE";

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (mode.id) {
      await dispatch(deleteDoctorThunk(mode.id as string));
      dispatch(fetchAllDoctorsthunk());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[20px] shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold text-text mb-4">حذف روانشناس</h3>
        <p className="text-sm text-secondary mb-8">آیا از حذف این روانشناس اطمینان دارید؟ این عملیات غیر قابل بازگشت است.</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => dispatch(resetDoctorForm())}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-300 transition-colors"
          >
            خیر، انصراف
          </button>
          <button onClick={handleConfirm} className="px-6 py-2 bg-error text-white rounded-lg text-sm font-bold hover:bg-error/90 transition-colors">
            بله، حذف کن
          </button>
        </div>
      </div>
    </div>
  );
}
