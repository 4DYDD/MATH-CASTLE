import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface BlurredProps {
  children: ReactNode;
  className?: string;
}

const Blurred = ({ children, className }: BlurredProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.7, filter: "blur(0.5px)" }}
        animate={{
          filter: ["blur(0.5px)", "blur(1.5px)", "blur(0.5px)"],
        }}
        transition={{
          filter: { duration: 0.5, ease: "easeInOut", repeat: Infinity }, // Blur runs infinitely
        }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Blurred;
