import StatusType from "@/shared/types/status.type";
import { Specialty } from "../specialties/types";

export interface Doctor {
  id: string;
  username: string;
  phone: string;
  firstname: string;
  lastname: string;
  role: "doctor";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  doctorProfile: DoctorProfile;
}

export interface DoctorProfile {
  id: string;
  doctorId: string;
  medicalCode: string;
  specialtyId: string;
  specialty: Specialty;
}

export interface DoctorState {
  status: StatusType;
  doctors: Doctor[];
  search: string;
}
