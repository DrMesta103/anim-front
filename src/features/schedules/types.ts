import StatusType from "@/shared/types/status.type";

export interface GroupOfDoctors {
  id: string;
  title: string;
  description: string;
  specialtyCode: string;
  doctors: DoctorProf[];
}

interface DoctorProf {
  id: string;
  doctorId: string;
  medicalCode: string;
  specialtyId: string;
  deletedAt: Date | null;
  doctor: DoctorDetails;
}

interface DoctorDetails {
  id: string;
  username: string;
  phone: string;
  firstname: string;
  lastname: string;
  role: "doctor";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ScheduleState {
  status: StatusType;
  groups: GroupOfDoctors[];
  search: string;
  selectedSpecialtyId: string;
}
