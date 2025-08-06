import DeviceGuard from "../components/DeviceGuard";
import Squares from "../components/Squares";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import Menubar from "./Menubar";
import Leaderboard from "./Leaderboard";
import Info from "./Info";
import ClickSpark from "../components/ClickSpark";

export default function RoomPage() {
  return (
    <DeviceGuard>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={30}
        sparkRadius={20}
        sparkCount={8}
        duration={300}
        extraScale={3}
        className="!transcenter"
      >
        <Squares
          speed={1.5}
          squareSize={20}
          direction="down" // up, down, left, right, diagonal
          borderColor="rgba(43,43,43,0.2)"
          hoverFillColor="rgba(0,0,0,0.0)"
        />

        <main className="h-[100dvh] flexcc !justify-end z-[2] relative">
          <div className="w-full flex-[4.5] overflow-y-scroll flexcc space-y-2 !justify-start scrollbar-visible">
            <Info />
            <Leaderboard />
          </div>

          {/* Menubar */}
          <Menubar />
        </main>
      </ClickSpark>
    </DeviceGuard>
  );
}
