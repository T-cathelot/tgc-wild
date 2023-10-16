import Link from "next/link";
import React, { useState } from "react";

const TestSvg: React.FC = () => {
  return (
    <>
      {" "}
      <h1>TestSvg</h1>
      <svg width="220" height="220">
        <g>
          <circle
            cx="110"
            cy="110"
            r="50"
            fill="transparent"
            stroke="orange"
            strokeWidth="7"
          />
          <Link href="/ads/new">
            {" "}
            <rect
              width="50"
              height="50"
              x="85"
              y="85"
              r="50"
              className="rectSvg"
            />
          </Link>
          <Link href="/about">
            <line
              className="lineSvg"
              x1="50"
              y1="170"
              x2="170"
              y2="50"
              strokeWidth="6"
            />
          </Link>
        </g>
      </svg>
    </>
  );
};

export default TestSvg;
