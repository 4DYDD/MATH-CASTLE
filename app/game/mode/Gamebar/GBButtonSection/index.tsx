"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import GameButton from "@/app/components/GameButton";

interface GBButtonSectionProps {
  item: {
    icon: IconProp;
    label: string;
    goTo?: string;
  };
  index?: number; // Optional index prop for mapping
}

const GBButtonSection = ({ item, index }: GBButtonSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <GameButton
        key={index}
        goTo={item.goTo}
        className="w-[30%] h-full flexcc p-3 bg-black/20 text-[10px]"
        isLoading={isLoading} // Pass isLoading state
        setIsLoading={setIsLoading} // Pass setIsLoading function
      >
        <FontAwesomeIcon icon={item.icon} className="text-2xl" />
        <span className="text-xs mt-2">{item.label}</span>
      </GameButton>
    </>
  );
};

export default GBButtonSection;
