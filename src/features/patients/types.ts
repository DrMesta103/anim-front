import ModeType from "@/shared/types/mode.type";
import StatusType from "@/shared/types/status.type";

export interface Patient {
  id: string;
  firstname: string;
  lastname: string;
  nationalCode: string;
  phone: string;
  email?: string;
  gender: "male" | "female";
  dateOfBirth: string;
  address: string;
}

export interface PatientDataType {
  firstname: string;
  lastname: string;
  nationalCode: string;
  phone: string;
  email?: string;
  gender: "male" | "female";
  dateOfBirth: string;
  address: string;
}

export interface PatientState {
  status: StatusType;
  patients: Patient[];
  search: string;
  mode: ModeType;
  data: PatientDataType;
  page: number;
  hasMore: boolean;
}

export interface FetchPatientsParams {
  limit: number;
  offset: number;
  search?: string;
}

export interface FetchPatientsResponse {
  data: Patient[];
  hasMore: boolean;
}
