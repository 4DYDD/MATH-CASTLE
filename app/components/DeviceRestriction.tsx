import React from "react";
import Logo from "./Logo";

interface DeviceRestrictionProps {
  deviceType: "tablet" | "desktop";
}

/**
 * Component untuk menampilkan pesan device restriction
 * Sesuai instruksi: Desktop/Tablet tampilkan pesan khusus
 */
const DeviceRestriction: React.FC<DeviceRestrictionProps> = ({
  deviceType,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flexcc p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Logo */}
        <div className="flexcc mb-8">
          <Logo className="scale-75" />
        </div>

        {/* Icon */}
        <div className="flexcc mb-6">
          <div className="size-20 bg-yellow-500/20 rounded-full flexcc">
            <svg
              className="size-10 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-white">📱 Akses Terbatas</h1>

          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <p className="text-sm text-slate-300 leading-relaxed">
              Website sedang dirancang untuk versi selain mobile.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed mt-2">
              Mohon maaf atas ketidaknyamanannya, terima kasih 🙏
            </p>
          </div>
        </div>

        {/* Device Info */}
        <div className="text-xs text-slate-500 space-y-1">
          <p>
            Device Terdeteksi:{" "}
            <span className="text-slate-400 capitalize">{deviceType}</span>
          </p>
          <p>Silakan akses menggunakan perangkat mobile</p>
        </div>

        {/* Decoration */}
        <div className="flexcc space-x-2 pt-4">
          <div className="size-2 bg-slate-600 rounded-full"></div>
          <div className="size-2 bg-slate-500 rounded-full"></div>
          <div className="size-2 bg-slate-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRestriction;
