import { AppDispatch, RootState } from "@/store";
import { Specialty } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllSpecialtiesthunk } from "../hooks";
import { formatFaPrice } from "@/shared/lib/formatFaPrice";
import { setDescription, setMode, setSearch, setSpecialtyCode, setTitle } from "../specialtySlice";
import SpecialtyModal from "./SpecialtiesModal";
import DeleteAlert from "./SpecialtiesDeleteAlert";
import { initialMode } from "@/shared/constants/mode.constant";

export default function Specialties() {
  const dispatch: AppDispatch = useDispatch();
  const specialties = useSelector((state: RootState) => state.specialty.specialties);
  const search = useSelector((state: RootState) => state.specialty.search);

  useEffect(() => {
    dispatch(fetchAllSpecialtiesthunk());
  }, []);

  const handleOpenAdd = () => {
    dispatch(setMode({ ...initialMode, method: "CREATE" }));
  };

  const handleOpenEdit = (specialty: Specialty) => {
    dispatch(setMode({ id: specialty.id, method: "UPDATE", title: specialty.title }));
    dispatch(setTitle(specialty.title));
    dispatch(setDescription(specialty.description));
    dispatch(setSpecialtyCode(specialty.specialtyCode));
  };

  const handleDeleteAlertOpen = (specialty: Specialty) => {
    dispatch(setMode({ id: specialty.id, method: "DELETE", title: specialty.title }));
  };

  return (
    <div className="p-6">
      <DeleteAlert />
      <SpecialtyModal />
      <div className="flex items-center gap-4 mb-8">
        <input
          value={search}
          onChange={({ target }) => dispatch(setSearch(target.value))}
          placeholder="جستجو..."
          className="w-full max-w-[400px] px-6 py-3 rounded-[15px] border border-accent bg-white shadow-sm 
                     text-text placeholder:text-gray-300 focus:border-primary focus:outline-none 
                     transition-all duration-200 text-sm"
        />
        <button
          onClick={handleOpenAdd}
          className="flex justify-center items-center  truncate px-6 py-3 bg-primary text-white rounded-[8px] text-sm font-bold 
                           hover:bg-primary/90 transition-colors shadow-sm"
        >
          افزودن +
        </button>
      </div>
      <h2 className="text-lg font-bold text-text mb-6">تمام تخصص ها</h2>
      <div className="rounded-[30px] bg-white shadow-[0_10px_30px_rgba(47,62,70,0.05)] border border-accent/10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0F4F2]">
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">ردیف</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">عنوان</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">توضیحات</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">کد تخصص</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {specialties
              .filter(
                (specialty) => specialty.title.includes(search.toLocaleLowerCase()) || specialty.specialtyCode.includes(search.toLocaleLowerCase()),
              )
              .map((specialty, index) => (
                <tr key={specialty.id} className="hover:bg-[#F0F4F2]/50 transition-colors">
                  <td className="text-sm text-text px-8 py-5 text-right">{formatFaPrice(index + 1)}</td>
                  <td className="text-sm font-semibold text-text px-8 py-5 truncate text-right">{specialty.title}</td>
                  <td className="text-sm text-secondary px-8 py-5 text-right truncate">{specialty.description}</td>
                  <td className="text-sm font-semibold text-primary px-8 py-5 truncate text-right">{specialty.specialtyCode}</td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(specialty)}
                        className="text-primary hover:text-text transition-colors p-1.5 rounded-lg hover:bg-accent/20"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteAlertOpen(specialty)}
                        className="text-primary hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error/10"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {specialties.length === 0 && (
        <div className="text-center py-12 text-secondary">
          <p>تخصصی پیدا نشد.</p>
        </div>
      )}
    </div>
  );
}
