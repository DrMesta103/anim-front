import { useSelector } from "react-redux";
import { GroupOfDoctors } from "../../types";
import DoctorCard from "./DoctorCard";
import { RootState } from "@/store";

export default function SpecialtySection({
  section,
  activeIndex,
  sectionStartIndex,
  onCardClick,
}: {
  section: GroupOfDoctors;
  activeIndex: number;
  sectionStartIndex: number;
  onCardClick: (index: number) => void;
}) {
  const search = useSelector((state: RootState) => state.schedules.search);
  return (
    <div dir="ltr">
      <div className="flex justify-end items-center gap-2 mb-3">
        <span className="bg-[#E8F4F1] text-[#52796F] font-bold text-xs px-2.5 py-0.5 rounded-full">
          {Array.isArray(section.doctors) ? section.doctors.length : 1}
        </span>
        <h2 className="text-[#2F3E46] font-bold text-lg">{section.title}</h2>
      </div>
      <div className="border-t border-[#E2E8E4] mb-5" />
      <div className="flex gap-5 flex-wrap flex-row-reverse">
        {(Array.isArray(section.doctors) ? section.doctors : [section.doctors])
          .filter((d) => `${d.doctor.firstname} ${d.doctor.lastname}`.includes(search.trim()))
          .map((doctor, idx) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              isActive={activeIndex === sectionStartIndex + idx}
              onClick={() => onCardClick(sectionStartIndex + idx)}
            />
          ))}
      </div>
    </div>
  );
}
