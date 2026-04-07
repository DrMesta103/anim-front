import { useRef, useEffect } from "react";
import { Patient } from "../types";
import { formatFaPrice } from "@/shared/lib/formatFaPrice";

interface Props {
  patient: Patient;
  index: number;
  isLast: boolean;
  onLastVisible: () => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

export default function PatientsTableRow({ patient, index, isLast, onLastVisible, onEdit, onDelete }: Props) {
  const rowRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    if (!isLast || !rowRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onLastVisible();
    });
    observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, [isLast]);

  return (
    <tr ref={rowRef} className="hover:bg-[#F0F4F2]/50 transition-colors">
      <td className="text-sm text-text px-8 py-5 text-right">{formatFaPrice(index + 1)}</td>
      <td className="text-sm font-semibold text-text px-8 py-5 text-right truncate">
        {patient.firstname} {patient.lastname}
      </td>
      <td className="text-sm text-secondary px-8 py-5 text-right">{patient.nationalCode}</td>
      <td className="text-sm text-secondary px-8 py-5 text-center">{patient.phone}</td>
      <td className="px-8 py-5 text-center">
        <div
          className={`inline-block w-16 text-center py-1.5 rounded-[12px] text-xs font-bold ${
            patient.gender === "male" ? "bg-primary text-white" : "bg-[#E63946] text-white"
          }`}
        >
          {patient.gender === "male" ? "مرد" : "زن"}
        </div>
      </td>
      <td className="text-sm font-semibold text-primary px-8 py-5 text-center truncate">{patient.dateOfBirth}</td>
      <td className="px-8 py-5 text-center">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onEdit(patient)}
            className="text-primary hover:text-text transition-colors p-1.5 rounded-lg hover:bg-accent/20"
            title="ویرایش"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(patient)}
            className="text-primary hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error/10"
            title="حذف"
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  );
}
