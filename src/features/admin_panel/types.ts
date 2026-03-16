import { adminPanelComponentsMap } from "./constants";

export interface AdminState {
  selectedTab: keyof typeof adminPanelComponentsMap;
}
