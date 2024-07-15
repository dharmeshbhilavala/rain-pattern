// RainComponent.js
import React, { useEffect, useState, useRef } from "react";
import { colorSequences } from "../utils/constant";

const RainComponent = ({ timing }) => {
  const boxCount = 15;
  const defaultColor = "bg-black";

  const [colors, setColors] = useState(Array(boxCount).fill(defaultColor));
  const stepRef = useRef(0);
  const stepDuration = 50;

  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [currentColorSequence, setCurrentColorSequence] = useState(colorSequences[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSequenceIndex((prevIndex) => (prevIndex + 1) % colorSequences?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentColorSequence(colorSequences[currentSequenceIndex]);
  }, [currentSequenceIndex]);

  useEffect(() => {
    let animationInterval;

    const runAnimation = () => {
      animationInterval = setInterval(() => {
        setColors((prevColors) => {
          const newColors = [...prevColors];

          for (let i = 0; i < boxCount; i++) {
            if (i <= stepRef.current && stepRef.current - i < currentColorSequence?.length) {
              newColors[i] = currentColorSequence[(stepRef.current - i) % currentColorSequence.length];
            } else {
              newColors[i] = defaultColor;
            }
          }

          stepRef.current++;
          if (stepRef.current === boxCount + currentColorSequence?.length) {
            stepRef.current = 0;
          }

          return newColors;
        });
      }, stepDuration);
    };

    const animationTime = setTimeout(() => {
      runAnimation();
    }, timing);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(animationTime);
    };
  }, [currentColorSequence]);

  return (
    <div className="flex justify-center pr-0.5 items-center min-h-full bg-gray-700">
      <div className="grid grid-rows-15 gap-0.5 w-12 h-screen">
        {colors?.map((color, index) => (
          <div key={index} className={`w-full flex-grow ${color} transition-colors duration-75`}></div>
        ))}
      </div>
    </div>
  );
};

export default RainComponent;
