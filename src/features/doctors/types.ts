import StatusType from "@/shared/types/status.type";
import { Specialty } from "../specialties/types";
import ModeType from "@/shared/types/mode.type";

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

export interface DoctorDataType {
  username: string;
  password: string;
  phone: string;
  firstname: string;
  lastname: string;
  medicalCode: string;
  specialtyId: string;
}

export interface DoctorState {
  status: StatusType;
  doctors: Doctor[];
  search: string;
  mode: ModeType;
  data: DoctorDataType;
}
