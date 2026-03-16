import StatusType from "@/shared/types/status.type";

export interface Specialty {
  id: number;
  title: string;
  description: string;
  specialtyCode: string;
}

export interface SpecialtyState {
  status: StatusType;
  specialties: Specialty[];
}
