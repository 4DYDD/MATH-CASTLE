import Image from "next/image";
import Logo from "./components/Logo";
import TextType from "./components/TextType";
import Squares from "./components/Squares";
import ClickSpark from "./components/ClickSpark";

export default function Home() {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={30}
      sparkRadius={20}
      sparkCount={8}
      duration={300}
      extraScale={3}
    >
      <main>
        <Squares
          speed={1.5}
          squareSize={20}
          direction="down" // up, down, left, right, diagonal
          borderColor="#545555"
          hoverFillColor="#545555"
        />

        <div className="flexcc relative z-[2] !justify-start h-full p-5 w-full">
          <Logo className={`mb-2.5`} />

          <div className="size-[300px] overflow-hidden rounded-xl shadow mb-5 select-none relative">
            <Image
              alt="Math Castle Logo"
              src="/image/istockfoto1.png"
              width={1300}
              height={1300}
              className="w-full h-full object-cover select-none"
            />
          </div>

          <div className="w-full text-center text-[12px] mb-3.5">
            <div className="flexc w-full space-x-1.5">
              <span className="">MATEMATIKA ILMU YANG</span>
              <TextType
                text={["MEMATIKAN?", "MENYENANGKAN!"]}
                typingSpeed={50}
                deletingSpeed={50}
                pauseDuration={1500}
                showCursor={true}
                cursorBlinkDuration={0.3}
                cursorCharacter="|"
              />
            </div>
          </div>

          <div className="text-center uppercase text-[10px] !text-secondary mb-8">
            <p className="px-7">
              Jawab soal matematika, rebut petak, dan bangun kastilmu! Tantang
              pemain lain dalam pertempuran 10 menit yang seru dan penuh
              strategi!
            </p>
          </div>

          <div className="flexc space-x-5 text-xs">
            <button className="bg-black/10 outline-[1px] text-white hover:bg-black/30 active:bg-black/100 hover:scale-105 active:scale-y-95 active:scale-x-110 transall select-none w-[120px] h-[35px] rounded">
              COBA TUTORIAL
            </button>
            <button className="bg-black/10 outline-[1px] text-yellow-400 hover:bg-black/30 active:bg-black/100 hover:scale-105 active:scale-y-95 active:scale-x-110 transall select-none w-[120px] h-[35px] rounded">
              MULAI BERMAIN
            </button>
          </div>
        </div>
      </main>
    </ClickSpark>
  );
}
