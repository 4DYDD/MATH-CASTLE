import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMedal } from "@fortawesome/free-solid-svg-icons";

interface PlayerHeaderProps {
  rank: string;
  pts: number;
  playerName: string;
  winRate: number;
}

const PlayerHeader: React.FC<PlayerHeaderProps> = ({
  rank,
  pts,
  playerName,
  winRate,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 pb-1 border-b-2 border-b-top rounded-b-lg px-3">
      <div className="flexc h-[45px] space-x-2.5 rounded-md">
        <div className="h-full flexc">
          <span className="bg-secondary size-10 rounded-lg flexc">
            <FontAwesomeIcon icon={faUser} className="text-bottom/90 text-sm" />
          </span>
        </div>

        <div className="text-left flexcc space-y-1 h-full">
          <h2 className="text-[16px] w-full leading-none text-white tracking-wide">
            {playerName.length > 10
              ? `${playerName.slice(0, 10)}...`
              : playerName}
          </h2>
          <span className="text-secondary/70 w-full leading-none text-xs">
            <FontAwesomeIcon icon={faMedal} className="mr-1" />
            Rank {rank}&nbsp;|&nbsp;{pts} pts
          </span>
        </div>
      </div>

      <div className="text-center flexcc py-2 rounded-md">
        <div className="rounded-lg">
          <span className="text-white">{winRate}%</span>
        </div>
        <span className="text-xs text-secondary/70">Win Rate</span>
      </div>
    </div>
  );
};

export default PlayerHeader;
