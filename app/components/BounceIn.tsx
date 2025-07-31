"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface BounceInProps {
  children: ReactNode;
  className?: string;
}

const BounceIn = ({ children, className }: BounceInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.5, 1], scale: [0, 1.2, 1] }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BounceIn;
