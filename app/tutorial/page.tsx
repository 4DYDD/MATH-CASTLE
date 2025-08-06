import DeviceGuard from "../components/DeviceGuard";
import Squares from "../components/Squares";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import BounceIn from "../components/BounceIn";

export default function TutorialPage() {
  return (
    <DeviceGuard>
      <Squares
        speed={1.5}
        squareSize={20}
        direction="down" // up, down, left, right, diagonal
        borderColor="rgba(43,43,43,0.2)"
        hoverFillColor="rgba(0,0,0,0.0)"
      />

      <div className="min-h-[100dvh] flexcc p-4 z-[2] relative">
        <BounceIn>
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">
              <FontAwesomeIcon icon={faGamepad} className="mr-2" /> Tutorial
              Mode
            </h1>
            <p className="text-secondary">
              Halaman tutorial akan segera hadir!
            </p>
          </div>
        </BounceIn>
      </div>
    </DeviceGuard>
  );
}
