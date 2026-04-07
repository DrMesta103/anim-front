import { secretaryPanelComponentsMap } from "./constants";

export interface AdminState {
  selectedTab: keyof typeof secretaryPanelComponentsMap;
  isNavbarOpen: boolean;
}
