import { useEffect, useState } from "react";
import { useDeviceStore } from "../stores/deviceStore";
import { DeviceType } from "../utils/deviceDetection";

/**
 * Custom hook untuk menangani device detection
 * Automatically initialize device info saat component mount
 * Fixed hydration mismatch dengan client-only detection
 */
export const useDeviceDetection = () => {
  const {
    deviceInfo,
    isAllowed,
    isLoading,
    hasHydrated,
    initializeDevice,
    updateDeviceInfo,
    setHydrated,
  } = useDeviceStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted (client-side)
    setMounted(true);
    setHydrated();

    // Initialize device detection hanya di client-side
    initializeDevice();

    // Listen untuk orientation change dan resize
    const handleResize = () => {
      updateDeviceInfo();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [initializeDevice, updateDeviceInfo, setHydrated]);

  // Prevent hydration mismatch - return safe defaults until mounted
  if (!mounted || !hasHydrated) {
    return {
      deviceInfo: null,
      isAllowed: false,
      isLoading: true,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isLaptop: false,
      isUnsupported: false,
      deviceType: "desktop" as DeviceType,
    };
  }

  return {
    deviceInfo,
    isAllowed: isAllowed,
    isLoading,
    isMobile: deviceInfo?.isMobile || false,
    isTablet: deviceInfo?.isTablet || false,
    isDesktop: deviceInfo?.isDesktop || false,
    isLaptop: deviceInfo?.isLaptop || false,
    isUnsupported: deviceInfo?.isUnsupported || false,
    deviceType: (deviceInfo?.deviceType as DeviceType) || "desktop",
  };
};
