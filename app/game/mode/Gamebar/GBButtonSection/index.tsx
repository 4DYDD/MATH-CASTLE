"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import GameButton from "@/app/components/GameButton";

interface GamebarItem {
  icon: IconProp;
  label: string;
  goTo?: string;
  onTouch?: (e: React.TouchEvent<HTMLButtonElement>) => void; // custom touch handler
  className?: string; // custom styling per button
}

interface GBButtonSectionProps {
  item: GamebarItem;
  index?: number;
}

const GBButtonSection = ({ item, index }: GBButtonSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <GameButton
        key={index}
        goTo={item.goTo}
        className={`w-[30%] h-full flexcc p-3 text-[10px] ${
          item.className || "bg-black/20"
        }`}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onTouch={(e) => {
          if (item.onTouch) item.onTouch(e);
        }}
      >
        <FontAwesomeIcon icon={item.icon} className="text-2xl" />
        <span className="text-xs mt-2">{item.label}</span>
      </GameButton>
    </>
  );
};

export default GBButtonSection;
