import React from "react";
import Logo from "./Logo";

/**
 * Loading screen saat device detection sedang berjalan
 */
const DeviceDetectionLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flexcc">
      <div className="text-center space-y-6">
        {/* Logo */}
        <div className="flexcc mb-8">
          <Logo className="animate-pulse" />
        </div>

        {/* Loading Animation */}
        <div className="flexcc space-x-2">
          <div className="size-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="size-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="size-2 bg-white rounded-full animate-bounce"></div>
        </div>

        {/* Loading Text */}
        <p className="text-sm text-slate-400">Mendeteksi perangkat...</p>
      </div>
    </div>
  );
};

export default DeviceDetectionLoading;
