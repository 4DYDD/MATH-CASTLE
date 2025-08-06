"use client";

import { useDeviceDetection } from "@/app/hooks/useDeviceDetection";
import React from "react";
import {
  faChessBoard,
  faFlagCheckered,
  faGlobe, // Ganti ikon di sini
} from "@fortawesome/free-solid-svg-icons";
import ClickSpark from "@/app/components/ClickSpark";
import MBButtonSection from "./MBButtonSection";

interface MenubarProps {
  className?: string;
}

const Menubar = ({ className }: MenubarProps) => {
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
                {[
                  { icon: faFlagCheckered, label: "Ranked Mode" },
                  { icon: faChessBoard, label: "Classic Mode" },
                  { icon: faGlobe, label: "Homepage", goTo: "/" }, // Ikon dan label diganti di sini
                ].map((item, index) => (
                  <MBButtonSection key={index} item={item} />
                ))}
              </div>
            </ClickSpark>
          </>
        )}

        {!isMobile && !isTablet && (
          <>
            <p>Desktop Menubar</p>
          </>
        )}
      </div>
    </>
  );
};

export default Menubar;
