import DeviceGuard from "../components/DeviceGuard";

export default function RoomPage() {
  return (
    <DeviceGuard>
      <div className="min-h-screen flexcc p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">🏠 Game Room</h1>
          <p className="text-slate-300">
            Halaman room/lobby akan segera hadir!
          </p>
        </div>
      </div>
    </DeviceGuard>
  );
}
