import PatientsTable from "../patients/components/Table";
import DoctorDirectory from "../schedules/components/directory/Directory";

export const secretaryPanelComponentsMap = {
  patients: { name: "patients", component: PatientsTable, title: "بیماران", header: "مدیریت بیماران" },
  schedules: { name: "schedules", component: DoctorDirectory, title: "روانشناس ها", header: "برنامه روانشناس ها" },
};
