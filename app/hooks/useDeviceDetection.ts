import { useEffect } from "react";
import { useDeviceStore } from "../stores/deviceStore";

/**
 * Custom hook untuk menangani device detection
 * Automatically initialize device info saat component mount
 */
export const useDeviceDetection = () => {
  const {
    deviceInfo,
    isAllowed,
    isLoading,
    initializeDevice,
    updateDeviceInfo,
  } = useDeviceStore();

  useEffect(() => {
    // Initialize device detection saat mount
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
  }, [initializeDevice, updateDeviceInfo]);

  return {
    deviceInfo,
    isAllowed,
    isLoading,
    isMobile: deviceInfo?.isMobile || false,
    isTablet: deviceInfo?.isTablet || false,
    isDesktop: deviceInfo?.isDesktop || false,
    isLaptop: deviceInfo?.isLaptop || false, // Add isLaptop detection
    deviceType: deviceInfo?.deviceType || "desktop",
  };
};
