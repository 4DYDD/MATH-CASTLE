"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDeviceDetection } from "../../hooks/useDeviceDetection"; // Assuming the hook is located here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons"; // Example icon

interface GameButtonProps {
  className?: string;
  children?: React.ReactNode;
  onTouch?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  goTo?: string; // Optional prop for navigation
  isLoading?: boolean; // Add isLoading prop
  setIsLoading?: (loading: boolean) => void; // Add setIsLoading prop
}

const GameButton = ({
  className,
  children,
  onTouch,
  goTo,
  isLoading = false, // Default to false if not provided
  setIsLoading,
}: GameButtonProps) => {
  const router = useRouter();
  const { isMobile, isTablet } = useDeviceDetection(); // Get device type

  // Handle touch start event dengan delay 300ms
  const handleOnTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    if (isLoading) return;

    event.currentTarget.classList.add("scale-y-95");
    event.currentTarget.classList.add("scale-x-105");
    event.currentTarget.classList.add("!bg-black/100");
  };

  const handleOnTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
    if (isLoading) return;

    const touch = event.changedTouches[0];
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const isInside =
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom;

    if (isInside) {
      // Kode jika jari masih di atas tombol
      if (onTouch) onTouch(event);

      // Trigger action logic
      if (goTo) {
        if (setIsLoading) setIsLoading(true); // Set loading state

        // Only navigate if not already loading
        // This prevents multiple navigations if the button is tapped multiple times
        if (!isLoading) {
          // alert("Navigating to: " + goTo); // Debugging line
          router.push(goTo);
        }
      }
    }

    event.currentTarget.classList.remove("scale-y-95");
    event.currentTarget.classList.remove("scale-x-105");
    event.currentTarget.classList.remove("!bg-black/100");
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const isInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (isInside) {
      if (goTo) {
        if (setIsLoading) setIsLoading(true); // Set loading state
        router.push(goTo);
      }
    }

    target.classList.remove("scale-y-95");
    target.classList.remove("scale-x-105");
    target.classList.remove("!bg-black/100");
  };

  return (
    <button
      onTouchStart={isMobile || isTablet ? handleOnTouchStart : undefined}
      onTouchEnd={isMobile || isTablet ? handleOnTouchEnd : undefined}
      onClick={!isMobile || isTablet ? handleOnClick : undefined}
      disabled={isLoading}
      className={`rounded select-none transall !duration-30 cursor-pointer 
        ${
          !isMobile &&
          !isTablet &&
          "active:scale-y-95 active:scale-x-105 active:!bg-black/100 hover:bg-black/30"
        } 
        ${isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} 
        ${className}`}
    >
      {isLoading ? (
        <>
          <span className="text-[10px]">
            <span>PLEASE WAIT...</span>
            <span className="ms-1 text-[10px] animate-spin relative inline-block">
              <FontAwesomeIcon icon={faHourglass} />
            </span>
          </span>
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default GameButton;
