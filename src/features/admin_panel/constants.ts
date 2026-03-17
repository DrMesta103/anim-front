import Doctors from "../doctors/components/Doctors";
import Rooms from "../rooms/components/Rooms";
import Secretaries from "../secretaries/components/Secretaries";
import Specialties from "../specialties/components/Specialties";
import Dashboard from "./components/Dashboard";

export const adminPanelComponentsMap = {
  dashboard: { name: "dashboard", component: Dashboard, title: "داشبورد", header: "نمای کلی داشیورد" },
  specialties: { name: "specialties", component: Specialties, title: "تخصص ها", header: "مدیریت تخصص ها" },
  rooms: { name: "rooms", component: Rooms, title: "اتاق ها", header: "مدیریت اتاق ها" },
  doctors: { name: "doctors", component: Doctors, title: "روانشناس ها", header: "مدیریت روانشناس ها" },
  secretaries: { name: "secretaries", component: Secretaries, title: "منشی ها", header: "مدیریت منشی ها" },
};
