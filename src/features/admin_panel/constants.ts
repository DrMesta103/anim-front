import DoctorsTable from "../doctors/components/Table";
import RoomsTable from "../rooms/components/Table";
import SecretariesTable from "../secretaries/components/Table";
import SpecialtiesTable from "../specialties/components/Table";
import Dashboard from "./components/Dashboard";

export const adminPanelComponentsMap = {
  dashboard: { name: "dashboard", component: Dashboard, title: "داشبورد", header: "نمای کلی داشبورد" },
  specialties: { name: "specialties", component: SpecialtiesTable, title: "تخصص ها", header: "مدیریت تخصص ها" },
  rooms: { name: "rooms", component: RoomsTable, title: "اتاق ها", header: "مدیریت اتاق ها" },
  doctors: { name: "doctors", component: DoctorsTable, title: "روانشناس ها", header: "مدیریت روانشناس ها" },
  secretaries: { name: "secretaries", component: SecretariesTable, title: "منشی ها", header: "مدیریت منشی ها" },
};
