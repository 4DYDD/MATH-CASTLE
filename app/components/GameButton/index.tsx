"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface GameButtonProps {
  className?: string;
  children?: React.ReactNode;
  onTouch?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  goTo?: string; // Optional prop for navigation
}

const GameButton = ({
  className,
  children,
  onTouch,
  goTo,
}: GameButtonProps) => {
  const router = useRouter();

  // State untuk mencegah spam touch
  const isTouchingRef = React.useRef(false);
  const haveDelayed = false;

  const [isLoading, setIsLoading] = React.useState(false);

  // Handle touch start event dengan delay 300ms
  const handleOnTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    if (haveDelayed && isTouchingRef.current) return;
    if (haveDelayed) isTouchingRef.current = true;

    event.currentTarget.classList.add("scale-y-95");
    event.currentTarget.classList.add("scale-x-105");
    event.currentTarget.classList.add("!bg-black/100");

    if (haveDelayed) {
      setTimeout(() => {
        isTouchingRef.current = false;
      }, 300);
    }
  };

  const handleOnTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
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
        setIsLoading(true);
        router.push(goTo);
      }
    }

    event.currentTarget.classList.remove("scale-y-95");
    event.currentTarget.classList.remove("scale-x-105");
    event.currentTarget.classList.remove("!bg-black/100");
  };

  return (
    <button
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      disabled={isLoading}
      className={`rounded select-none transall !duration-30 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {isLoading ? (
        <>
          <span className="text-[10px]">
            <span>PLEASE WAIT...</span>
            <span className="ms-1 text-[10px] animate-spin relative inline-block">
              ⌛
            </span>
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default GameButton;
