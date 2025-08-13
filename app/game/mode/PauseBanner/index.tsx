"use client";
import React from "react";
import { useGameplayStore } from "@/app/stores/gameplayStore";
import { PauseCircle, RefreshCcw } from "lucide-react";

/**
 * PauseBanner
 * Banner overlay sederhana yang muncul ketika game dalam status pause.
 * Mengambil state global dari gameplayStore (isPaused, isPauseSyncing, getRemainingPauseMs).
 * Future enhancement: tampilkan siapa yang mem-pause, countdown sisa kuota pause, tombol force resume (server authority), dsb.
 */
const PauseBanner: React.FC = () => {
  const isPaused = useGameplayStore((s) => s.isPaused);
  const isPauseSyncing = useGameplayStore((s) => s.isPauseSyncing);
  const remainingPauseMs = useGameplayStore((s) => s.getRemainingPauseMs());
  const isPauseUnlimited = useGameplayStore((s) => s.isPauseUnlimited());

  if (!isPaused && !isPauseSyncing) return null; // tidak render jika tidak relevan

  const remainingSeconds = isPauseUnlimited
    ? Infinity
    : Math.ceil(remainingPauseMs / 1000);

  return (
    <div className="z-[4] atranscenter w-full h-full flexc">
      {/* Backdrop */}
      <div className="atranscenter w-full h-full bg-black/60 backdrop-blur-xs" />

      {/* Banner Card */}
      <div className="relative mx-4 w-full max-w-sm rounded-xl border border-yellow-500/30 bg-gradient-to-b from-[#292719] to-[#1b1a12] shadow-[0_0_0_1px_rgba(255,193,7,0.25),0_8px_28px_-6px_rgba(0,0,0,0.55)] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent" />
        <div className="p-5 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-yellow-300/90">
            <PauseCircle className="w-8 h-8 drop-shadow" />
            <h2 className="text-lg font-semibold tracking-wide">Game Paused</h2>
          </div>

          <p className="text-center text-[13px] text-yellow-100/80 leading-relaxed">
            {isPauseSyncing
              ? "Menyinkronkan status pause ke server (simulasi)..."
              : "Pertandingan sementara dihentikan. Waktu match tidak berkurang selama pause."}
          </p>

          {!isPauseSyncing && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px] uppercase tracking-wider text-yellow-500/70">
                {isPauseUnlimited ? "Pause Mode (DEV)" : "Sisa Kuota Pause"}
              </span>
              <div className="font-mono text-xs text-yellow-200 bg-black/30 px-3 py-1 rounded-md border border-yellow-500/30">
                {isPauseUnlimited ? "UNLIMITED" : `${remainingSeconds}s`}
              </div>
            </div>
          )}

          {isPauseSyncing && (
            <div className="flex items-center gap-2 text-[12px] text-yellow-200 animate-pulse">
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Syncing...</span>
            </div>
          )}

          <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mt-2" />
          <p className="text-[11px] text-center text-yellow-100/50 leading-relaxed px-3">
            Mode development: limit pause dimatikan supaya bisa langsung resume
            kapan saja. Gunakan tombol Resume di Gamebar bawah. Simulasi akan
            diganti Socket.IO ack.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PauseBanner;
