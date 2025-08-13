"use client";

import { useDeviceDetection } from "@/app/hooks/useDeviceDetection";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ClickSpark from "@/app/components/ClickSpark";
import GBButtonSection from "./GBButtonSection";

interface GamebarItem {
  icon: IconProp;
  label: string;
  goTo?: string;
  onTouch?: (e: React.TouchEvent<HTMLButtonElement>) => void;
  className?: string;
}

interface GamebarProps {
  className?: string;
  items: GamebarItem[]; // required
}

const Gamebar = ({ className, items }: GamebarProps) => {
  const { isMobile, isTablet } = useDeviceDetection();

  return (
    <>
      <div
        className={`w-full relative flex-[1] bg-bottom p-0 flexc border-t border-t-top/30 ${className}`}
      >
        {(isMobile || isTablet) && (
          <>
            <ClickSpark
              sparkColor="#fff"
              sparkSize={30}
              sparkRadius={20}
              sparkCount={8}
              duration={300}
              extraScale={3}
              className="flexc px-2.5 pb-4"
            >
              <div className="flexc !justify-evenly w-full h-[70px]">
                {items.map((item, index) => (
                  <GBButtonSection key={index} item={item} />
                ))}
              </div>
            </ClickSpark>
          </>
        )}

        {!isMobile && !isTablet && (
          <>
            <p>Desktop Gamebar</p>
          </>
        )}
      </div>
    </>
  );
};

export default Gamebar;
