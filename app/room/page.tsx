import DeviceGuard from "../components/DeviceGuard";
import Squares from "../components/Squares";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import BounceIn from "../components/BounceIn";

export default function RoomPage() {
  return (
    <DeviceGuard>
      <Squares
        speed={1.5}
        squareSize={20}
        direction="down" // up, down, left, right, diagonal
        borderColor="rgba(43,43,43,0.2)"
        hoverFillColor="rgba(0,0,0,0.0)"
      />

      <div className="min-h-screen flexcc p-4 z-[2] relative !bg-gradient-to-b from-top/50 to-bottom/50">
        <BounceIn>
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Game Room
            </h1>
            <p className="text-secondary">
              Halaman room/lobby akan segera hadir!
            </p>
          </div>
        </BounceIn>
      </div>
    </DeviceGuard>
  );
}
