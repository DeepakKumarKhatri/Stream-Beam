import React from "react";

const StreamLoopLogo = ({ width = 40, height = 40, theme = "light" }) => {
  const mainColor = theme === "light" ? "#1a1a1a" : "#ffffff";
  const accentColor = "#00a8e8";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="18" stroke={mainColor} strokeWidth="2" />
      <path
        d="M14 26C14 21.5817 17.5817 18 22 18C26.4183 18 30 21.5817 30 26"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M26 14C26 18.4183 22.4183 22 18 22C13.5817 22 10 18.4183 10 14"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="2" fill={mainColor} />
    </svg>
  );
};

export default StreamLoopLogo;
