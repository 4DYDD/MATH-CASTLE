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
  hasHydrated: boolean; // Add hydration flag

  // Actions
  initializeDevice: () => void;
  updateDeviceInfo: () => void;
  setHydrated: () => void; // Add hydration setter
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  deviceInfo: null,
  isAllowed: false,
  isLoading: true,
  hasHydrated: false,

  initializeDevice: () => {
    // Only run on client-side after hydration
    if (typeof window === "undefined") return;

    const deviceInfo = getDeviceInfo();
    const isAllowed = isDeviceAllowed();

    set({
      deviceInfo,
      isAllowed,
      isLoading: false,
      hasHydrated: true,
    });
  },

  updateDeviceInfo: () => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    const deviceInfo = getDeviceInfo();
    const isAllowed = isDeviceAllowed();

    set({
      deviceInfo,
      isAllowed,
    });
  },

  setHydrated: () => {
    set({ hasHydrated: true });
  },
}));
