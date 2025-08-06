import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faChartPie } from "@fortawesome/free-solid-svg-icons";

interface StatsGridProps {
  wins: number;
  losses: number;
  totalMatches: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  wins,
  losses,
  totalMatches,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      {/* Wins */}
      <div className="text-white rounded-lg p-4 bg-green-500/10 border-2 border-green-600">
        <div className="flexcc space-y-2">
          <FontAwesomeIcon
            icon={faTrophy}
            className="text-3xl text-green-600"
          />
          <span className="text-xl font-bold">{wins}</span>
        </div>
        <p className="text-sm mt-2">Kemenangan</p>
      </div>

      {/* Losses */}
      <div className="text-white rounded-lg p-4 bg-red-500/10 border-2 border-red-600">
        <div className="flexcc space-y-2">
          <FontAwesomeIcon icon={faTrophy} className="text-3xl text-red-600" />
          <span className="text-xl font-bold">{losses}</span>
        </div>
        <p className="text-sm mt-2">Kekalahan</p>
      </div>

      {/* Total Matches */}
      <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20 col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faChartPie} className="text-yellow-400" />
            <span className="text-sm text-white">Total Matchmaking</span>
          </div>
          <span className="text-2xl font-bold text-yellow-400">
            {totalMatches}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
