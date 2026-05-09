import { animate } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export const AnimatedCounter = ({ value, suffix = "" }: AnimatedCounterProps) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest))
    });

    return () => controls.stop();
  }, [value]);

  return <span>{display}{suffix}</span>;
};
