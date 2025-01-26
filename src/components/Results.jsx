// Results.js
import React from "react";

export default function Results({ text, percentage, votes }) {
    return (
        <div className="votes ">
            <label
                htmlFor={text}
                className=" flex block rounded border-4 border-transparent cursor-pointer  p-6"
            >
                <p className="result-text text-2xl font-bold flex items-center justify-between">
                    {text}

                </p>
                <div className="result-progress-container">
                    <progress
                        className=" result-progress w-full h-2 mt-4 [&::-webkit-progress-bar] [&::-webkit-progress-value]"
                        value={percentage}
                        max="100"
                    >
                        {percentage}%
                    </progress>
                </div>
                <div className="result-end-container">
                    <p className="text-2xl font-bold flex items-center justify-between">
                        <span>{percentage || 0}%</span>
                    </p>
                </div>
                <small className="text-slate-500">{votes} votes</small>
            </label>
        </div>
    );
}
