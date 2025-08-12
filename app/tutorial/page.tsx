import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import BounceIn from "../components/BounceIn";
import GameLayout from "../components/GameLayout";

export default function TutorialPage() {
  return (
    <GameLayout contentScrollable={false} contentWrapperClassName="p-4">
      <div className="min-h-[100dvh] flexcc w-full">
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
    </GameLayout>
  );
}
