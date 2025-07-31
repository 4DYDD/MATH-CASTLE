import Image from "next/image";
import Logo from "./components/Logo";
import TextType from "./components/TextType";
import Squares from "./components/Squares";
import ClickSpark from "./components/ClickSpark";
import LPButtonSection from "./components/LPButtonSection";

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
          borderColor="rgba(43,43,43,0.2)"
          hoverFillColor="rgba(0,0,0,0.0)"
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

          <div className="w-full text-center text-[14px] mb-4">
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

          <div className="text-left text-[12px] !text-secondary mb-8">
            <ul className="px-10 list-disc list-outside">
              <li className="mb-1.5 ps-1">
                Jawab soal matematika, rebut petak, dan bangun kastilmu!
              </li>
              <li className="ps-1">
                Tantang pemain lain dalam pertempuran 10 menit yang seru dan
                penuh strategi !
              </li>
            </ul>
          </div>

          <LPButtonSection />
        </div>
      </main>
    </ClickSpark>
  );
}
