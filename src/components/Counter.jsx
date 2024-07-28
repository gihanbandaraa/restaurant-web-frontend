import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Counter = ({ start, end, duration, style }) => {
  const [count, setCount] = useState(start);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      let startTime;
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(easeInOutQuad(progress, start, end - start, 1)));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, start, end, duration]);

  return (
    <div ref={ref} className="font-montserrat text-2xl md:text-3xl font-bold text-white">
      {count}+
    </div>
  );
};

export default Counter;
