"use client";

import React, { useState } from "react";
import GameButton from "../GameButton";

const LPButtonSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="flexc space-x-5 text-xs">
        <GameButton
          goTo="/tutorial"
          className={`bg-black/10 outline-[1px] text-white w-[120px] h-[35px]`}
          isLoading={isLoading} // Pass isLoading state
          setIsLoading={setIsLoading} // Pass setIsLoading function
        >
          COBA TUTORIAL
        </GameButton>
        <GameButton
          goTo="/room"
          className={`bg-black/10 outline-[1px] text-yellow-400 w-[120px] h-[35px]`}
          isLoading={isLoading} // Pass isLoading state
          setIsLoading={setIsLoading} // Pass setIsLoading function
        >
          MULAI BERMAIN
        </GameButton>
      </div>
    </>
  );
};

export default LPButtonSection;
