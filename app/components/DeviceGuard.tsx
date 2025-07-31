"use client";

import React, { useEffect, useState } from "react";
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
  const [showRestriction, setShowRestriction] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setShowRestriction(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
    // Reset jika device berubah/allowed
    setShowRestriction(false);
  }, [isLoading]);

  if (isLoading) {
    return <DeviceDetectionLoading />;
  }

  if (!isAllowed) {
    if (!showRestriction) return <DeviceDetectionLoading />;

    return (
      <DeviceRestriction deviceType={deviceType as "laptop" | "desktop"} />
    );
  }

  if (!showRestriction) return <DeviceDetectionLoading />;

  return <>{children}</>;
};

export default DeviceGuard;
