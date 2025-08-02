import DeviceGuard from "../components/DeviceGuard";
import Squares from "../components/Squares";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import Menubar from "./Menubar/page";
import Info from "./Info/page";
import Options from "./Options/page";
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

        <main className="h-screen pb-12 pt-2.5 flexcc !justify-end z-[2] relative !bg-gradient-to-b from-top/50 to-bottom/50">
          <div className="w-full flex-[4.5] flexcc">
            <Info />
            <Options />
          </div>

          {/* Menubar */}
          <Menubar />
        </main>
      </ClickSpark>
    </DeviceGuard>
  );
}
