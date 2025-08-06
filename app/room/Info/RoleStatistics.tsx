import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";

interface RoleStatsType {
  mathMonster: number;
  speedrunner: number;
  balancer: number;
}

interface RoleStatisticsProps {
  roleStats: RoleStatsType;
}

const RoleStatistics: React.FC<RoleStatisticsProps> = ({ roleStats }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
        <FontAwesomeIcon icon={faChartPie} className="mr-2" />
        Persentase Role Favorit
      </h3>

      <div className="space-y-2">
        {/* Math Monster - Purple */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-slate-300">Math Monster</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-slate-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${roleStats.mathMonster}%` }}
              ></div>
            </div>
            <span className="text-xs text-purple-400 font-semibold w-8 text-right">
              {roleStats.mathMonster}%
            </span>
          </div>
        </div>

        {/* Speedrunner - Green */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-300">Speedrunner</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-slate-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${roleStats.speedrunner}%` }}
              ></div>
            </div>
            <span className="text-xs text-green-400 font-semibold w-8 text-right">
              {roleStats.speedrunner}%
            </span>
          </div>
        </div>

        {/* Balancer - Blue */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-300">Balancer</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${roleStats.balancer}%` }}
              ></div>
            </div>
            <span className="text-xs text-blue-400 font-semibold w-8 text-right">
              {roleStats.balancer}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleStatistics;
