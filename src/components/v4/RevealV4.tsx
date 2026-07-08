"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealV4Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export default function RevealV4({
  children,
  delay = 0,
  y = 36,
  className,
}: RevealV4Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}
