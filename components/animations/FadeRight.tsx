'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion"; // ✅ corrected import path

function FadeRight({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}} // ✅ animate only when in view
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default FadeRight;
