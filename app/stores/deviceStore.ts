import { create } from "zustand";
import {
  DeviceInfo,
  getDeviceInfo,
  isDeviceAllowed,
} from "../utils/deviceDetection";

interface DeviceStore {
  deviceInfo: DeviceInfo | null;
  isAllowed: boolean;
  isLoading: boolean;

  // Actions
  initializeDevice: () => void;
  updateDeviceInfo: () => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  deviceInfo: null,
  isAllowed: false,
  isLoading: true,

  initializeDevice: () => {
    const deviceInfo = getDeviceInfo();
    const isAllowed = isDeviceAllowed();

    set({
      deviceInfo,
      isAllowed,
      isLoading: false,
    });
  },

  updateDeviceInfo: () => {
    const deviceInfo = getDeviceInfo();
    const isAllowed = isDeviceAllowed();

    set({
      deviceInfo,
      isAllowed,
    });
  },
}));
