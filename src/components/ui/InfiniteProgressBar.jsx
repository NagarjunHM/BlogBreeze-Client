import React from "react";

const InfiniteProgressBar = () => {
  return (
    <div>
      <style>
        {`
          @keyframes progress {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>

      <div className="fixed top-[57px] left-0 w-full h-[1px] ">
        <div
          className="h-full bg-green-400 shadow-2xl animate-progress shadow-white"
          style={{ animation: "progress 2s linear infinite" }}
        ></div>
      </div>
    </div>
  );
};

export default InfiniteProgressBar;
