"use client";
import React, { memo, useCallback } from "react";
import GameButton from "@/app/components/GameButton";

export interface RoleVisualEntry {
  label: string;
  color: string;
  icon: string;
}
export type RoleVisualMap = Record<string, RoleVisualEntry>;

export interface CellData {
  role: string;
  owner: number;
}

export interface SelectedCell {
  row: number;
  col: number;
}

interface GameBoardProps {
  board: (CellData | null)[][];
  roleVisual: RoleVisualMap;
  selectedCell: SelectedCell | null;
  onSelectCell: (row: number, col: number, cell: CellData | null) => void;
  className?: string;
  cellClassName?: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  roleVisual,
  selectedCell,
  onSelectCell,
  className = "",
  cellClassName = "",
}) => {
  const handleSelect = useCallback(
    (row: number, col: number) => {
      onSelectCell(row, col, board[row][col]);
    },
    [board, onSelectCell]
  );

  return (
    <div
      className={`grid grid-cols-6 gap-[5px] my-5 w-[85%] max-w-md mx-auto select-none ${className}`}
    >
      {board.map((rowArr, r) =>
        rowArr.map((cell, c) => {
          const isSelected = selectedCell?.row === r && selectedCell?.col === c;
          return (
            <GameButton
              key={`${r}-${c}`}
              className={`aspect-square w-full border border-slate-600/30 cursor-pointer flex items-center justify-center text-base sm:text-lg font-semibold select-none bg-gradient-to-b from-[#1f1f1f] to-[#141414] hover:from-[#252525] hover:to-[#181818] hover:border-yellow-400/60 ${
                isSelected ? "border-yellow-400 ring-2 ring-yellow-400/100" : ""
              } ${cellClassName}`}
              onTouch={(e) => {
                e.stopPropagation();
                handleSelect(r, c);
              }}
            >
              {cell && (
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-sm sm:text-base">
                    {roleVisual[cell.role]?.icon || "?"}
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
        })
      )}
    </div>
  );
};

export default memo(GameBoard);
