import React from "react";
import Tooltip from "../utils/Tooltip";

function CheckNone() {
  return (
    <Tooltip text={"Pendiente por realizar"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 16 16"
        version="1.1"
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      >
        <path d="m11.75 1.75 2.5 2m-10-2-2.5 2m10.5 9.5 1 1m-9.5-1-1 1m5.5-7.5v2.5l-1.5 1" />
        <circle cx="8" cy="9" r="5.25" />
      </svg>
    </Tooltip>
  );
}

export default CheckNone;
