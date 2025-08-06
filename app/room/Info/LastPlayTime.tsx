import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface LastPlayTimeProps {
  lastPlayTime: string;
}

const LastPlayTime: React.FC<LastPlayTimeProps> = ({ lastPlayTime }) => {
  return (
    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faClock} className="text-slate-400" />
          <span className="text-sm text-slate-300">Terakhir Bermain</span>
        </div>
        <span className="text-sm text-slate-400">{lastPlayTime}</span>
      </div>
    </div>
  );
};

export default LastPlayTime;
