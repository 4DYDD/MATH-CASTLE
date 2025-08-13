"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Timer, Sword } from "lucide-react";
import GameLayout from "../../../components/GameLayout";
import Image from "next/image";
import ClickSpark from "@/app/components/ClickSpark";
import {
  faFlag,
  faFaceSmile,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Gamebar from "../Gamebar";
import GameBoard from "../GameBoard";
import { useGameplayStore } from "@/app/stores/gameplayStore";
import PauseBanner from "../PauseBanner";

const Classic = () => {
  // Role visual mapping (3 roles only)
  const roleVisual = {
    mathMonster: { label: "Math Monster", color: "bg-purple-600", icon: "🟣" },
    speedrunner: { label: "Speedrunner", color: "bg-green-500", icon: "🟢" },
    balancer: { label: "Balancer", color: "bg-blue-500", icon: "🔵" },
  } as const;

  type RoleKey = keyof typeof roleVisual;

  // Board state (placeholder empty 6x6)
  const [gameBoard] = useState<(null | { role: RoleKey; owner: number })[][]>(
    () => Array.from({ length: 6 }, () => Array.from({ length: 6 }, () => null))
  );

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  // Global gameplay store hooks
  const isPaused = useGameplayStore((s) => s.isPaused);
  const togglePause = useGameplayStore((s) => s.togglePause);
  const isPauseSyncing = useGameplayStore((s) => s.isPauseSyncing);
  const startMatch = useGameplayStore((s) => s.startMatch);
  const getMatchRemainingMs = useGameplayStore((s) => s.getMatchRemainingMs);

  // Force re-render tiap detik agar countdown tampil (store hitung berbasis Date.now)
  const [, force] = useState(0);
  // Jalankan startMatch sekali saat mount untuk menghindari loop update.
  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) {
      startMatch();
      startedRef.current = true;
    }
    const id = setInterval(() => force((v) => (v + 1) % 1000000), 1000);
    return () => clearInterval(id);
  }, [startMatch]);

  // Format match timer
  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const matchRemainingMs = getMatchRemainingMs();

  // Handle select cell (future: open level menu / validate ownership etc)
  const handleSelectCell = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  // Clear selection when clicking outside board
  const clearSelection = useCallback(() => {
    if (selectedCell) setSelectedCell(null);
  }, [selectedCell]);

  // Gamebar action buttons (console only for now)
  const gamebarItems = [
    {
      icon: faFlag,
      label: "Surrender",
      className:
        "bg-black/20 border border-red-500/60 rounded-md shadow-inner shadow-red-900/40",
      onTouch: () => {
        console.log("SURRENDER_CLICK");
      },
    },
    {
      icon: faFaceSmile,
      label: "Emote",
      className:
        "bg-black/20 border border-amber-500/60 rounded-md shadow-inner shadow-amber-900/40",
      onTouch: () => {
        console.log("EMOTE_CLICK");
      },
    },
    {
      icon: isPaused ? faPlay : faPause,
      label: isPauseSyncing ? "Sync..." : isPaused ? "Resume" : "Pause",
      className: `${
        isPaused
          ? "bg-black/20 border border-green-500/60"
          : "bg-black/20 border border-slate-500/60"
      } rounded-md shadow-inner shadow-black/40 ${
        isPauseSyncing ? "opacity-50" : ""
      }`,
      onTouch: () => {
        if (isPauseSyncing) return;
        console.log(isPaused ? "RESUME_CLICK" : "PAUSE_CLICK");
        togglePause();
      },
    },
  ];

  return (
    <GameLayout
      contentScrollable={false}
      contentWrapperClassName="bg-[#0e0e0e] p-4"
      customMenubar={<Gamebar items={gamebarItems} />}
    >
      <PauseBanner />

      <div onClick={clearSelection} className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="rounded-xl p-3 mb-2 border border-slate-700/60 bg-gradient-to-b from-[#1c1c1c] to-[#121212] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)]">
          <div className="flexcc space-y-5">
            <div className="px-4 py-3 rounded-lg border w-full border-slate-600/70 bg-[#181818] flexc space-x-2">
              <div className="w-full">
                <div className="bg-red-500 rounded-xl size-[120px] flexcc !justify-end relative overflow-hidden group outline-0 hover:!outline-4 hover:outline-top__darker transall !duration-300">
                  <Image
                    width={120}
                    height={120}
                    alt="Your Enemy"
                    src="/images/memberi-laiks.jpg"
                    className="w-full object-cover atranscenter"
                  />
                  <span className="relative z-[2] w-full bg-top__darker text-center text-sm p-1 -bottom-52 group-hover:bottom-0 transall !duration-300">
                    Sansan
                  </span>
                </div>
              </div>

              <div className="flexcc space-y-2 w-full">
                <Timer className="w-6 h-6 text-yellow-400" />

                <div className="flexcc space-y-0">
                  <span className="text-xl font-mono font-semibold text-white">
                    {formatTime(matchRemainingMs)}
                  </span>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Match Timer
                  </p>
                </div>

                <div>Classic Mode</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-[1]">
          {/* Board Section */}
          <ClickSpark
            sparkColor="yellow"
            sparkSize={10}
            sparkRadius={20}
            sparkCount={8}
            duration={300}
            extraScale={3}
          >
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-xl p-4 border border-slate-700/60 bg-[#151515]">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1.5 rounded-md bg-[#222] border border-slate-600/70 text-[11px] tracking-wide text-slate-300 flex items-center gap-2">
                    <span className="relative p-2">
                      <Sword className="w-4 h-4 text-yellow-400 atranscenter" />
                      <Sword className="w-4 h-4 text-yellow-400 atranscenter -scale-x-100" />
                    </span>
                    <span className="font-medium text-slate-200">
                      Battlefield 6x6
                    </span>
                  </div>
                </div>

                <GameBoard
                  board={gameBoard}
                  roleVisual={roleVisual}
                  selectedCell={selectedCell}
                  onSelectCell={handleSelectCell}
                />

                <div className="flexc !justify-end gap-2">
                  <div className="px-2 py-1.5 rounded-md bg-[#222] border border-slate-600/70 text-[11px] tracking-wide text-slate-300 flex items-center gap-2">
                    <span className="relative p-2">
                      <Sword className="w-4 h-4 text-yellow-400 atranscenter" />
                      <Sword className="w-4 h-4 text-yellow-400 atranscenter -scale-x-100" />
                    </span>
                    <span className="font-medium text-slate-200">
                      Battlefield 6x6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ClickSpark>
        </div>
      </div>
    </GameLayout>
  );
};

export default Classic;
