"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { RotateLoader } from "react-spinners";
import Blurred from "./Blurred";

/**
 * Loading screen saat device detection sedang berjalan
 */
const DeviceDetectionLoading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [isLoading]);

  return (
    <div className="min-h-screen !bg-gradient-to-b from-top__darker to-bottom__darker">
      <div className="text-center transcenter">
        {/* Logo */}
        <div className="flexcc mb-8">
          <Logo className="animate-pulseku-bounce" />
        </div>

        {/* Loading Animation */}
        <div className="flexc my-16">
          <div className="flexc scale-75 rounded-full">
            {isLoading && (
              <Blurred>
                <RotateLoader
                  color="#ffffff"
                  size={14}
                  margin={1}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Blurred>
            )}

            {!isLoading && (
              <Blurred>
                <RotateLoader
                  color="#ffffff"
                  size={14}
                  margin={1}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Blurred>
            )}
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-sm text-top animate-pulseku">
          Mendeteksi Perangkat...
        </p>
      </div>
    </div>
  );
};

export default DeviceDetectionLoading;
