import React, { useEffect, useRef } from "react";

export default function Results({ text, percentage, votes }) {
  const progressRef = useRef(null);

  useEffect(() => {
    if (progressRef.current) {
      const value = percentage || 0;
      progressRef.current.style.setProperty("--progress-value", value);
    }
  }, [percentage]);

  return (
    <div className="votes">
      <label
        htmlFor={text}
        className="result-container flex block rounded border-4 border-transparent cursor-pointer"
      >
        <p className="result-text text-2xl font-bold flex items-center justify-between">
          {text}
        </p>
        <div className="result-progress-container">
          <div className="progress-wrapper" ref={progressRef}>
            <progress
              className="result-progress"
              value={percentage}
              max="100"
            ></progress>
            <span className="progress-percentage">{votes} <div>Votes</div></span>
          </div>
        </div>
        <div className="result-end-container">
        </div>

      </label>
    </div>
  );
}
