'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedEmojiProps {
  symbol: string;
  delay?: number;
  className?: string;
}

export default function AnimatedEmoji({ symbol, delay = 0, className = "" }: AnimatedEmojiProps) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={{ 
        rotate: [0, 15, -15, 0], 
        scale: [1, 1.2, 1],
        y: [0, -8, 0]
      }}
      transition={{ 
        duration: 2.5, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay
      }}
    >
      {symbol}
    </motion.span>
  );
}
