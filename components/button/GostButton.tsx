'use client';

import React from 'react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion'; // ✅ Correct package

const MotionButton = motion(Button);

const GostButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionButton
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      variant="ghost"
      className="bg-gray-100 flex items-center justify-center cursor-pointer"
    >
      {children}
    </MotionButton>
  );
};

export default GostButton;
