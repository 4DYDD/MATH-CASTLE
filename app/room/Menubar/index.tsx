"use client";

import { useDeviceDetection } from "@/app/hooks/useDeviceDetection";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import GameButton from "@/app/components/GameButton";

interface MenubarProps {
  className?: string;
}

const Menubar = ({ className }: MenubarProps) => {
  // const { isMobile, isTablet, deviceType } = useDeviceDetection();
  const { isMobile, isTablet } = useDeviceDetection();

  return (
    <>
      <div
        className={`w-full flex-[1] border-red-500 border p-0 flexc ${className}`}
      >
        {(isMobile || isTablet) && (
          <>
            {/* pengecekan deviceType */}
            {/* <p className="transcenter">{deviceType} Menubar</p> */}

            <div className="flexc !justify-evenly border-red-500 border w-full">
              {[
                { icon: faHome, label: "Home" },
                { icon: faInfoCircle, label: "About" },
                { icon: faEnvelope, label: "Contact" },
              ].map((item, index) => (
                <GameButton
                  key={index}
                  className="border-red-500 border w-[30%] h-full flexcc p-4"
                >
                  <FontAwesomeIcon icon={item.icon} className="text-3xl" />
                  <span className="text-xs mt-2">{item.label}</span>
                </GameButton>
              ))}
            </div>
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
