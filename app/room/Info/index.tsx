// import BounceIn from "@/app/components/BounceIn";
import React from "react";
import PlayerHeader from "./PlayerHeader";
import StatsGrid from "./StatsGrid";
import RoleStatistics from "./RoleStatistics";
import LastPlayTime from "./LastPlayTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Import ikon pengguna
import ClickSpark from "@/app/components/ClickSpark";

// Mock data - nanti akan diganti dengan data real dari backend/API
const mockPlayerData = {
  rank: "#127",
  playerName: "Somwannnnnn",
  wins: 42,
  pts: 39,
  losses: 18,
  totalMatches: 60,
  roleStats: {
    mathMonster: 35, // Purple - Level Sulit ONLY
    speedrunner: 45, // Green - Level Mudah (Speed)
    balancer: 20, // Blue - Level Sedang (Balance)
  },
  lastPlayTime: "2 jam yang lalu",
  winRate: 70, // (wins / totalMatches) * 100
};

const Info = () => {
  const {
    rank,
    playerName,
    wins,
    losses,
    totalMatches,
    roleStats,
    lastPlayTime,
    winRate,
    pts,
  } = mockPlayerData;

  return (
    <>
      <div className="relative text-center w-[94%] flexc flex-[1] my-3 border border-top/20 bg-bottom rounded-xl">
        <ClickSpark
          sparkColor="#fff"
          sparkSize={30}
          sparkRadius={20}
          sparkCount={8}
          duration={300}
          extraScale={3}
          className="w-full py-2.5 px-2"
        >
          <div className="p-3 text-white">
            {/* Player Header */}
            <h1 className="text-3xl my-2 flexcc text-top/50">
              <FontAwesomeIcon icon={faUser} className="" />
              <span className="my-2.5 text-lg">Player Info</span>
            </h1>

            <PlayerHeader
              rank={rank}
              playerName={playerName}
              winRate={winRate}
              pts={pts}
            />

            {/* Stats Grid */}
            <StatsGrid
              wins={wins}
              losses={losses}
              totalMatches={totalMatches}
            />

            {/* Role Statistics */}
            <RoleStatistics roleStats={roleStats} />

            {/* Last Play Time */}
            <LastPlayTime lastPlayTime={lastPlayTime} />
          </div>
          {/* <BounceIn className="w-full max-w-md mx-auto">
          // Komponen yang akan dianimasikan nanti
          </BounceIn> */}
        </ClickSpark>
      </div>
    </>
  );
};

export default Info;
