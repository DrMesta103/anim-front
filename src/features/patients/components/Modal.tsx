"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setData, setMode, refreshData } from "../slice";
import { useSubmitPatient } from "../hooks";
import { useState } from "react";
import PersianDatePicker from "@/shared/components/ui/PersianDatePicker";
import { validateNationalCode, validatePhone } from "@/shared/lib/validate";
import { convertToEnglishDigits } from "@/shared/lib/persianToEnglish";

export default function PatientsModal() {
  const dispatch: AppDispatch = useDispatch();
  const { mode, data } = useSelector((state: RootState) => state.patient);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const createPatient = useSubmitPatient("CREATE");
  const updatePatient = useSubmitPatient("UPDATE");

  const handleClose = () => {
    dispatch(setMode({ id: "", method: "READ", title: "" }));
    dispatch(refreshData());
  };

  if (mode.method !== "CREATE" && mode.method !== "UPDATE") return null;

  return (
    <>
      {showDatePicker && (
        <PersianDatePicker
          value={data.dateOfBirth}
          onChange={(val) => dispatch(setData({ dateOfBirth: val }))}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2F3E46]/40 backdrop-blur-sm">
        <div
          dir="rtl"
          className="relative w-full max-w-[550px] bg-white rounded-[24px] shadow-[0_15px_40px_rgba(47,62,70,0.15)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F4F2]">
            <h3 className="text-lg font-bold text-text">{mode.method === "UPDATE" ? "ویرایش بیمار" : "افزودن بیمار"}</h3>
            <button
              onClick={handleClose}
              className="p-2 text-secondary hover:text-text bg-transparent hover:bg-[#F0F4F2] rounded-xl transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form className="flex flex-col p-6 gap-5 max-h-[70vh] overflow-y-auto" onSubmit={mode.method === "CREATE" ? createPatient : updatePatient}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold text-secondary">نام</label>
                <input
                  type="text"
                  value={data.firstname}
                  onChange={({ target }) => dispatch(setData({ firstname: target.value }))}
                  placeholder="علی"
                  required
                  className="input-field"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold text-secondary">نام خانوادگی</label>
                <input
                  type="text"
                  value={data.lastname}
                  onChange={({ target }) => dispatch(setData({ lastname: target.value }))}
                  placeholder="احمدی"
                  required
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold text-secondary">کد ملی</label>
                <input
                  type="text"
                  value={data.nationalCode}
                  onChange={({ target }) => {
                    const correctedNationalCode = validateNationalCode(convertToEnglishDigits(target.value));
                    typeof correctedNationalCode === "string" ? dispatch(setData({ nationalCode: correctedNationalCode })) : null;
                  }}
                  placeholder="1234567890"
                  required
                  maxLength={10}
                  className="input-field"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold text-secondary">شماره تماس</label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={({ target }) => {
                    const correctedPhone = validatePhone(convertToEnglishDigits(target.value));
                    typeof correctedPhone === "string" ? dispatch(setData({ phone: correctedPhone })) : null;
                  }}
                  placeholder="09123456789"
                  required
                  maxLength={11}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">
                ایمیل <span className="text-gray-300 font-normal">(اختیاری)</span>
              </label>
              <input
                type="text"
                value={data.email ?? ""}
                onChange={({ target }) => dispatch(setData({ email: convertToEnglishDigits(target.value) }))}
                placeholder="example@email.com"
                className="input-field"
                dir="ltr"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold text-secondary">تاریخ تولد</label>
                <button type="button" onClick={() => setShowDatePicker(true)} className="input-field text-right flex items-center justify-between">
                  <span className={data.dateOfBirth ? "text-text" : "text-gray-300"}>{data.dateOfBirth || "انتخاب تاریخ"}</span>
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-bold text-secondary">جنسیت</label>
                <select
                  value={data.gender}
                  onChange={({ target }) => dispatch(setData({ gender: target.value as "male" | "female" }))}
                  className="input-field appearance-none"
                >
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-secondary">آدرس</label>
              <textarea
                value={data.address}
                onChange={({ target }) => dispatch(setData({ address: target.value }))}
                placeholder="آدرس کامل بیمار را وارد کنید..."
                rows={3}
                className="input-field resize-none"
              />
            </div>
            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#F0F4F2]">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-[10px] bg-[#F0F4F2] text-text font-bold text-sm hover:bg-[#CAD2C5]/50 transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-[10px] bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
              >
                ثبت اطلاعات
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
