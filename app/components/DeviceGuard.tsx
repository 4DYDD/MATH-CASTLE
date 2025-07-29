"use client";

import React from "react";
import { useDeviceDetection } from "../hooks/useDeviceDetection";
import DeviceRestriction from "./DeviceRestriction";
import DeviceDetectionLoading from "./DeviceDetectionLoading";

interface DeviceGuardProps {
  children: React.ReactNode;
}

/**
 * Component wrapper untuk device detection
 * Mengatur akses berdasarkan device type sesuai instruksi Math Castle
 */
const DeviceGuard: React.FC<DeviceGuardProps> = ({ children }) => {
  const { isLoading, isAllowed, deviceType } = useDeviceDetection();

  // Loading state
  if (isLoading) {
    return <DeviceDetectionLoading />;
  }

  // Device tidak diizinkan (tablet/desktop)
  if (!isAllowed) {
    return (
      <DeviceRestriction deviceType={deviceType as "tablet" | "desktop"} />
    );
  }

  // Device mobile - izinkan akses
  return <>{children}</>;
};

export default DeviceGuard;
