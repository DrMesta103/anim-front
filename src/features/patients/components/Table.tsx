"use client";

import { AppDispatch, RootState } from "@/store";
import { Patient } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPatientsThunk, useFetchMorePatients } from "../hooks";
import { setSearch, setMode, setData, refreshData, refreshState } from "../slice";
import { initialMode } from "@/shared/constants/mode.constant";
import PatientsModal from "./Modal";
import PatientsDeleteAlert from "./DeleteAlert";
import TableSkeleton from "@/shared/components/ui/TableSkeleton";
import PatientsTableRow from "./TableRow";

const LIMIT = 1;

export default function PatientsTable() {
  const dispatch: AppDispatch = useDispatch();
  const { patients, search, status } = useSelector((state: RootState) => state.patient);
  const fetchMore = useFetchMorePatients();

  useEffect(() => {
    dispatch(fetchPatientsThunk({ limit: LIMIT, offset: 0, search }));
  }, [search]);

  useEffect(() => {
    return () => {
      dispatch(refreshState());
    };
  }, []);

  const handleOpenAdd = () => {
    dispatch(refreshData());
    dispatch(setMode({ ...initialMode, method: "CREATE" }));
  };

  const handleOpenEdit = (patient: Patient) => {
    dispatch(
      setData({
        firstname: patient.firstname,
        lastname: patient.lastname,
        nationalCode: patient.nationalCode,
        phone: patient.phone,
        email: patient.email ?? "",
        gender: patient.gender,
        dateOfBirth: patient.dateOfBirth,
        address: patient.address,
      }),
    );
    dispatch(setMode({ id: patient.id, method: "UPDATE", title: `${patient.firstname} ${patient.lastname}` }));
  };

  const handleDeleteAlertOpen = (patient: Patient) => {
    dispatch(setMode({ id: patient.id, method: "DELETE", title: `${patient.firstname} ${patient.lastname}` }));
  };

  return (
    <div className="p-6">
      <PatientsDeleteAlert />
      <PatientsModal />

      <div className="flex items-center gap-4 mb-8">
        <input
          value={search}
          onChange={({ target }) => dispatch(setSearch(target.value))}
          placeholder="جستجو..."
          className="w-full max-w-[400px] px-6 py-3 rounded-[15px] border border-accent bg-white shadow-sm text-text placeholder:text-gray-300 focus:border-primary focus:outline-none transition-all duration-200 text-sm"
        />
        <button
          onClick={handleOpenAdd}
          className="flex justify-center truncate items-center px-6 py-3 bg-primary text-white rounded-[8px] text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm"
        >
          افزودن +
        </button>
      </div>

      <h2 className="text-lg font-bold text-text mb-6">تمام بیماران</h2>

      <div className="rounded-[30px] bg-white shadow-[0_10px_30px_rgba(47,62,70,0.05)] overflow-x-auto border border-accent/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0F4F2]">
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">ردیف</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">نام و نام خانوادگی</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">کد ملی</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">شماره تماس</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">جنسیت</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">تاریخ تولد</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <PatientsTableRow
                key={patient.id}
                patient={patient}
                index={index}
                isLast={index === patients.length - 1}
                onLastVisible={fetchMore}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteAlertOpen}
              />
            ))}
            {status === "loading" && <TableSkeleton rowCount={10} columnCount={7} />}
          </tbody>
        </table>
      </div>

      {status !== "loading" && patients.length === 0 && (
        <div className="text-center py-12 text-secondary">
          <p>بیماری پیدا نشد.</p>
        </div>
      )}
    </div>
  );
}
