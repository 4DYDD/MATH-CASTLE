// import BounceIn from "@/app/components/BounceIn";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const Leaderboard = () => {
  // DUMMY LEADERBOARD DATA
  const leaderboardData = [
    {
      rank: 1,
      name: "Somwan",
      score: 120,
      bgGradient: "bg-gradient-to-b from-transparent from-95% to-gray-100/50",
    },
    {
      rank: 2,
      name: "Sumwan",
      score: 100,
      bgGradient: "bg-gradient-to-b from-transparent from-95% to-gray-100/50",
    },
    {
      rank: 3,
      name: "Samwan",
      score: 80,
      bgGradient: "bg-gradient-to-b from-transparent from-95% to-gray-100/50",
    },
    {
      rank: 4,
      name: "Somuwan Berjaya Perkasa Slebew",
      score: 70,
      bgGradient: "bg-gradient-to-b from-transparent from-95% to-gray-100/50",
    },
    {
      rank: 5,
      name: "Sumowan Yang Baik Hati Dan Rajin Menabung",
      score: 60,
      bgGradient: "bg-gradient-to-b from-transparent from-95% to-gray-100/50",
    },
  ];

  return (
    <div className="text-center flexc w-full flex-[1] py-2.5">
      <div className="w-full p-4">
        <h1 className="text-lg mb-4 flex items-center justify-center">
          <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />
          <span className="mx-2.5">Leaderboard</span>
          <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />
        </h1>

        <div className="relative">
          <ul className="space-y-1.5">
            {leaderboardData.map((player) => (
              <li
                key={player.rank}
                className={`${player.bgGradient} px-4 py-3 rounded-md text-white text-center text-sm flex justify-between items-center w-full`}
                style={{ width: "100%" }}
              >
                <span className="font-bold">#{player.rank}</span>
                <span className="text-left flex-1 ml-5 mr-5">
                  {player.name.length > 25
                    ? `${player.name.slice(0, 25)}...`
                    : player.name}
                </span>
                <span>{player.score} pts</span>
              </li>
            ))}
          </ul>
        </div>
        {/* <BounceIn className="flexcc w-screen">
        // Komponen yang akan dianimasikan nanti
        </BounceIn> */}
      </div>
    </div>
  );
};

export default Leaderboard;
