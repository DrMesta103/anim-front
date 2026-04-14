import { AppDispatch } from "@/store";
import { DoctorProf, GroupOfDoctors } from "../../types";
import StatusDot from "./StatusDot";
import { useDispatch } from "react-redux";
import { fetchSelectedDoctorThunk } from "../../hooks";

export default function DoctorCard({ doctor, isActive, onClick }: { doctor: DoctorProf; isActive: boolean; onClick: () => void }) {
  const { doctor: user, deletedAt } = doctor;
  const initials = `${user.firstname[0]} ${user.lastname[0]}`;
  const fullName = `${user.firstname} ${user.lastname}`;
  const dispatch: AppDispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(fetchSelectedDoctorThunk({ id: user.id }))}
      className={`rounded-xl cursor-pointer flex-shrink-0 w-64 transition-all duration-200 border-2 ${
        isActive
          ? "bg-white border-[#52796F] shadow-md"
          : "bg-[#FAFCFB] border-transparent shadow-[inset_0_0_0_1px_#E2E8E4] hover:shadow-[inset_0_0_0_1px_#CAD2C5]"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3 flex-row-reverse">
          <div className="relative flex-shrink-0">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                isActive ? "bg-[#CAD2C5] text-[#2F3E46]" : "bg-[#E2E8E4] text-[#84A98C]"
              }`}
            >
              {initials}
            </div>
            <StatusDot deletedAt={deletedAt} />
          </div>
          <div className="pt-1 text-right">
            <p className="font-bold text-[#2F3E46] text-sm leading-tight">{fullName}</p>
            <p className="text-[#84A98C] text-xs mt-0.5">{user.phone}</p>
          </div>
        </div>
      </div>

      {isActive ? (
        <div className="mx-1 mb-1 rounded-lg bg-[#F0F4F2] px-4 py-2.5 text-center">
          <span className="text-[#52796F] font-bold text-sm">← مشاهده برنامه</span>
        </div>
      ) : (
        <div className="border-t border-[#E2E8E4] px-4 py-2.5 text-center">
          <span className="text-[#84A98C] font-bold text-sm">مشاهده برنامه</span>
        </div>
      )}
    </div>
  );
}
