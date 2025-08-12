import GameLayout from "../../../components/GameLayout";

const Ranked: React.FC = () => {
  return (
    <GameLayout contentScrollable={false} contentWrapperClassName="p-4">
      <div className="w-full flex items-center justify-center">
        <h1 className="text-white text-xl font-semibold">
          Ranked Mode (Coming Soon)
        </h1>
      </div>
    </GameLayout>
  );
};

export default Ranked;
