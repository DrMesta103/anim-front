import StatusType from "@/shared/types/status.type";
import { Doctor } from "../doctors/types";
import { Patient } from "../patients/types";
import { Room } from "../rooms/types";
import { Secretary } from "../secretaries/types";
import { Specialty } from "../specialties/types";

export interface ScheduleState {
  status: StatusType;
  groups: GroupOfDoctors[];
  search: string;
  selectedSpecialtyId: string;
  selectedDoctor: Doctor | null;
  doctorSchedules: DoctorSchedule[];
  schedulePage: number;
}

export interface GroupOfDoctors {
  id: string;
  title: string;
  description: string;
  specialtyCode: string;
  doctors: DoctorProf[];
}

export interface DoctorProf {
  id: string;
  doctorId: string;
  medicalCode: string;
  specialtyId: string;
  deletedAt: Date | null;
  doctor: DoctorDetails;
  specialty: Specialty;
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

export interface DoctorSchedule {
  id: string;
  doctor_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  doctor: Doctor;
  schedules: Schedule[];
}

export interface Schedule {
  id: string;
  doctor_schedule_id: string;
  patient_id: string;
  room_id: string;
  start_time: string;
  end_time: string;
  status: "booked" | "in_session" | "done" | "canceled";
  created_by: string;
  created_at: Date;
  updated_at: Date;
  doctor: Doctor | null;
  patient: Patient | null;
  room: Room;
  secretary: Secretary;
  notes: any;
  reminders: any;
}

export interface CanceledSchedule {
  id: string;
  doctor_schedule_id: string;
  canceled_by: string;
  reason: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  doctor_schedule: DoctorSchedule;
}
