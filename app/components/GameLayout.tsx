"use client";
import React, { ReactNode } from "react";
import DeviceGuard from "./DeviceGuard";
import Squares from "./Squares";
import ClickSpark from "./ClickSpark";
import Menubar from "../room/Menubar";

type DirectionOption = "up" | "down" | "left" | "right" | "diagonal";
interface SquaresConfig {
  speed?: number;
  squareSize?: number;
  direction?: DirectionOption;
  borderColor?: string;
  hoverFillColor?: string;
}

interface GameLayoutProps {
  children: ReactNode;
  contentScrollable?: boolean;
  contentWrapperClassName?: string;
  showMenubar?: boolean;
  enableSpark?: boolean;
  squaresConfig?: SquaresConfig;
}

const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  contentScrollable = true,
  contentWrapperClassName = "",
  showMenubar = true,
  enableSpark = true,
  squaresConfig = {},
}) => {
  const squaresProps: SquaresConfig = {
    speed: 1.5,
    squareSize: 20,
    direction: "down",
    borderColor: "rgba(43,43,43,0.2)",
    hoverFillColor: "rgba(0,0,0,0.0)",
    ...squaresConfig,
  };

  const contentClasses = [
    "w-full flex-[4.5] flexcc !justify-start",
    contentScrollable
      ? "overflow-y-scroll scrollbar-visible"
      : "overflow-hidden",
    contentWrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const Core = (
    <main className="h-[100dvh] flexcc !justify-end z-[2] relative">
      <div className={contentClasses}>{children}</div>
      {showMenubar && <Menubar />}
    </main>
  );

  const WithSquares = (
    <>
      <Squares
        speed={squaresProps.speed}
        squareSize={squaresProps.squareSize}
        direction={squaresProps.direction}
        borderColor={squaresProps.borderColor}
        hoverFillColor={squaresProps.hoverFillColor}
      />
      {Core}
    </>
  );

  const WithSpark = enableSpark ? (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={30}
      sparkRadius={20}
      sparkCount={8}
      duration={300}
      extraScale={3}
      className="!transcenter"
    >
      {WithSquares}
    </ClickSpark>
  ) : (
    WithSquares
  );

  return <DeviceGuard>{WithSpark}</DeviceGuard>;
};

export default GameLayout;
