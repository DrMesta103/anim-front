import Rooms from "../rooms/components/Rooms";
import Specialties from "../specialties/components/Specialties";
import Dashboard from "./components/Dashboard";

export const adminPanelComponentsMap = {
  dashboard: { name: "dashboard", component: Dashboard, title: "داشبورد", header: "نمای کلی داشیورد" },
  specialties: { name: "specialties", component: Specialties, title: "تخصص ها", header: "مدیریت تخصص ها" },
  rooms: { name: "rooms", component: Rooms, title: "اتاق ها", header: "مدیریت اتاق ها" },
  doctors: { name: "doctors", component: Rooms, title: "دکتر ها", header: "مدیریت دکتر ها" },
  secretaries: { name: "secretaries", component: Rooms, title: "منشی ها", header: "مدیریت منشی ها" },
};
