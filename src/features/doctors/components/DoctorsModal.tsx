"use client";

import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setData, resetDoctorForm } from "../doctorSlice";
import { addDoctorThunk, updateDoctorThunk, fetchAllDoctorsthunk } from "../hooks";

export default function DoctorsModal() {
  const dispatch: AppDispatch = useDispatch();
  const { mode, data } = useSelector((state: RootState) => state.doctor);
  const specialties = useSelector((state: RootState) => state.specialty.specialties);

  const isOpen = mode.method === "CREATE" || mode.method === "UPDATE";

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode.method === "CREATE") {
      await dispatch(addDoctorThunk(data));
    } else if (mode.method === "UPDATE" && mode.id) {
      await dispatch(updateDoctorThunk({ id: mode.id as string, data }));
    }
    dispatch(fetchAllDoctorsthunk());
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2F3E46]/40 backdrop-blur-sm transition-opacity">
      <div
        dir="rtl"
        className="relative w-full max-w-[600px] bg-white rounded-[24px] shadow-[0_15px_40px_rgba(47,62,70,0.15)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F4F2] sticky top-0 bg-white z-10">
          <h3 className="text-lg font-bold text-text">{mode.method === "CREATE" ? "افزودن روانشناس جدید" : "ویرایش روانشناس"}</h3>
          <button
            onClick={() => dispatch(resetDoctorForm())}
            className="p-2 text-secondary hover:text-text bg-transparent hover:bg-[#F0F4F2] rounded-xl transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Firstname Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">نام</label>
              <input
                type="text"
                value={data.firstname}
                onChange={(e) => dispatch(setData({ firstname: e.target.value }))}
                placeholder="مثال: علی"
                required
                className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text 
                           focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                           transition-all duration-200 text-sm placeholder:text-gray-300"
              />
            </div>

            {/* Lastname Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">نام خانوادگی</label>
              <input
                type="text"
                value={data.lastname}
                onChange={(e) => dispatch(setData({ lastname: e.target.value }))}
                placeholder="مثال: محمدی"
                required
                className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text 
                           focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                           transition-all duration-200 text-sm placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Username Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">نام کاربری</label>
              <input
                type="text"
                value={data.username}
                onChange={(e) => dispatch(setData({ username: e.target.value }))}
                placeholder="نام کاربری برای ورود"
                required
                dir="ltr"
                className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text text-left
                           focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                           transition-all duration-200 text-sm placeholder:text-gray-300 placeholder:text-right"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">رمز عبور</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => dispatch(setData({ password: e.target.value }))}
                placeholder={mode.method === "UPDATE" ? "خالی برای عدم تغییر" : "رمز عبور را وارد کنید"}
                required={mode.method === "CREATE"}
                dir="ltr"
                className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text text-left
                           focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                           transition-all duration-200 text-sm placeholder:text-gray-300 placeholder:text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Phone Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">شماره موبایل</label>
              <input
                type="text"
                value={data.phone}
                onChange={(e) => dispatch(setData({ phone: e.target.value }))}
                placeholder="مثال: 09123456789"
                required
                dir="ltr"
                className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text text-left
                           focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                           transition-all duration-200 text-sm placeholder:text-gray-300 placeholder:text-right"
              />
            </div>

            {/* Medical Code Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">کد پزشکی (نظام روانشناسی)</label>
              <input
                type="text"
                value={data.medicalCode}
                onChange={(e) => dispatch(setData({ medicalCode: e.target.value }))}
                placeholder="مثال: 12345"
                required
                dir="ltr"
                className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text text-left
                           focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                           transition-all duration-200 text-sm placeholder:text-gray-300 placeholder:text-right"
              />
            </div>
          </div>

          {/* Specialty Select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-secondary">تخصص</label>
            <select
              value={data.specialtyId}
              onChange={(e) => dispatch(setData({ specialtyId: e.target.value }))}
              required
              className="w-full px-4 py-3 rounded-[12px] border border-accent/50 bg-white text-text 
                         focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none 
                         transition-all duration-200 text-sm"
            >
              <option value="" disabled>
                انتخاب تخصص...
              </option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.title}
                </option>
              ))}
            </select>
          </div>

          {/* Footer / Actions */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#F0F4F2]">
            <button
              type="button"
              onClick={() => dispatch(resetDoctorForm())}
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
