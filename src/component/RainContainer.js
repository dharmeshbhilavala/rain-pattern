// RainContainer
import React, { useState } from "react";
import RainComponent from "./RainComponent";
import { RandomDelayTimeArray } from "../utils/constant";

const RainContainer = () => {
  const [array] = useState(() => RandomDelayTimeArray(20, 50, 400));

  return (
    <div className="flex h-full">
      {array?.map((timing, index) => (
        <RainComponent key={index} timing={timing} />
      ))}
    </div>
  );
};

export default RainContainer;
