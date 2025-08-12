"use client";
import React, { useState, useCallback } from "react";
import { Timer, Sword } from "lucide-react";
import GameLayout from "../../../components/GameLayout";
import Image from "next/image";
import GameButton from "@/app/components/GameButton";
import ClickSpark from "@/app/components/ClickSpark";

const Classic = () => {
  // Role visual mapping (3 roles only)
  const roleVisual = {
    mathMonster: { label: "Math Monster", color: "bg-purple-600", icon: "🟣" },
    speedrunner: { label: "Speedrunner", color: "bg-green-500", icon: "🟢" },
    balancer: { label: "Balancer", color: "bg-blue-500", icon: "🔵" },
  } as const;

  type RoleKey = keyof typeof roleVisual;

  interface CellData {
    role: RoleKey;
    owner: number; // player id
  }

  const [gameBoard] = useState<(CellData | null)[][]>(() => {
    return Array.from({ length: 6 }, () =>
      Array.from({ length: 6 }, () => null)
    );
  });

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [timeRemaining] = useState<number>(600); // 10 menit (placeholder)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCellClick = (row: number, col: number) => {
    if (!gameBoard[row][col]) {
      setSelectedCell({ row, col });
    } else {
      // Toggle select if already occupied (optional behavior)
      setSelectedCell({ row, col });
    }
  };

  const clearSelection = useCallback(() => {
    if (selectedCell) setSelectedCell(null);
  }, [selectedCell]);

  const renderCell = (row: number, col: number) => {
    const cell = gameBoard[row][col];
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    return (
      <GameButton
        key={`${row}-${col}`}
        className={`aspect-square w-full border border-slate-600/30 cursor-pointer flex items-center justify-center text-base sm:text-lg font-semibold select-none
        bg-gradient-to-b from-[#1f1f1f] to-[#141414]
        hover:from-[#252525] hover:to-[#181818] hover:border-yellow-400/60
        ${isSelected ? "border-yellow-400 ring-2 ring-yellow-400/100" : ""}`}
        onTouch={(e) => {
          e.stopPropagation();
          handleCellClick(row, col);
        }}
        // onClick={(e) => {
        //   e.stopPropagation();
        //   handleCellClick(row, col);
        // }}
      >
        {cell && (
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-sm sm:text-base">
              {roleVisual[cell.role].icon}
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                cell.owner === 1
                  ? "bg-blue-500"
                  : cell.owner === 2
                  ? "bg-red-500"
                  : cell.owner === 3
                  ? "bg-green-500"
                  : "bg-yellow-400"
              }`}
            />
          </div>
        )}
      </GameButton>
    );
  };

  return (
    <GameLayout
      contentScrollable={false}
      contentWrapperClassName="bg-[#0e0e0e] p-4"
    >
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
                    src="/image/memberi-laiks.jpg"
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
                    {formatTime(timeRemaining)}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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

                <div className="grid grid-cols-6 gap-[5px] my-5 w-[85%] max-w-md mx-auto select-none">
                  {Array.from({ length: 6 }).map((_, r) =>
                    Array.from({ length: 6 }).map((_, c) => renderCell(r, c))
                  )}
                </div>

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
