import ModeType from "@/shared/types/mode.type";
import StatusType from "@/shared/types/status.type";

export interface Specialty {
  id: string;
  title: string;
  description: string;
  specialtyCode: string;
}

export interface SpecialtyDataType {
  title: string;
  description: string;
  specialtyCode: string;
}

export interface SpecialtyState {
  status: StatusType;
  specialties: Specialty[];
  search: string;
  mode: ModeType;
  data: SpecialtyDataType;
}
