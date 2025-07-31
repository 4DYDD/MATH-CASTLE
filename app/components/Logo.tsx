import React from "react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <>
      {/* LOGO SEMENTARA */}
      <div className={`w-[200px] h-[100px] flexcc text-center ${className}`}>
        <div className="text-yellow-400 text-4xl w-full tracking-wider">
          MATH
        </div>
        <div className="text-white text-lg w-full tracking-wide">CASTLE</div>
      </div>
    </>
  );
};

export default Logo;
