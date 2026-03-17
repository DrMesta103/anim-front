"use client";

import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatFaPrice } from "@/shared/lib/formatFaPrice";
import { setSearch } from "../secretarySlice";
import { fetchAllSecretariesthunk } from "../hooks";

export default function Secretaries() {
  const dispatch: AppDispatch = useDispatch();
  const secretaries = useSelector((state: RootState) => state.secretary.secretaries);
  const search = useSelector((state: RootState) => state.secretary.search);

  useEffect(() => {
    dispatch(fetchAllSecretariesthunk());
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <input
          value={search}
          onChange={({ target }) => dispatch(setSearch(target.value))}
          placeholder="جستجو..."
          className="w-full max-w-[400px] px-6 py-3 rounded-[15px] border border-accent bg-white shadow-sm text-text placeholder:text-gray-300 focus:border-primary focus:outline-none transition-all duration-200 text-sm"
        />
        <button className="flex justify-center truncate items-center px-6 py-3 bg-primary text-white rounded-[8px] text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
          افزودن +
        </button>
      </div>

      <h2 className="text-lg font-bold text-text mb-6">تمام منشی ها</h2>

      <div className="rounded-[30px] bg-white shadow-[0_10px_30px_rgba(47,62,70,0.05)] overflow-x-auto border border-accent/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0F4F2]">
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">ردیف</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">نام</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">نام خانوادگی</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">شماره تلفن</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {secretaries
              .filter(
                (secretary) =>
                  `${secretary.firstname} ${secretary.lastname}`.includes(search.toLocaleLowerCase()) || secretary.phone.includes(search),
              )
              .map((secretary, index) => (
                <tr key={secretary.id} className="hover:bg-[#F0F4F2]/50 transition-colors">
                  <td className="text-sm text-text px-8 py-5 text-right">{formatFaPrice(index + 1)}</td>
                  <td className="text-sm font-semibold text-text px-8 py-5 text-right truncate">{secretary.firstname}</td>
                  <td className="text-sm font-semibold text-text px-8 py-5 text-right truncate">{secretary.lastname}</td>
                  <td className="text-sm text-secondary px-8 py-5 text-right truncate">{secretary.phone}</td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-primary hover:text-text transition-colors p-1.5 rounded-lg hover:bg-accent/20" title="Edit">
                        ✏️
                      </button>
                      <button className="text-primary hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error/10" title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {secretaries.length === 0 && (
        <div className="text-center py-12 text-secondary">
          <p>منشی ای پیدا نشد.</p>
        </div>
      )}
    </div>
  );
}
