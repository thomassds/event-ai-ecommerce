"use client";

import { Button } from "./button";
import { Tooltip } from "react-tooltip";

interface IconedButtonProps {
  icon: React.ReactNode;
  upperText: string;
  lowerText: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  tooltipText?: string;
}

export function IconedButton({
  icon,
  upperText,
  lowerText,
  type = "button",
  onClick,
  tooltipText,
}: IconedButtonProps) {
  return (
    <Button
      type={type}
      onClick={() => onClick?.()}
      className="w-fit flex items-center font-thin shadow-none justify-center gap-1 border-none bg-transparent outline-none text-white hover:text-gray-200 hover:bg-white/10 transition-all duration-200 rounded-lg px-3 py-2"
    >
      {tooltipText && <Tooltip id="iconed-button-tooltip" />}
      {icon}
      <span
        className="text-left"
        data-tooltip-id="iconed-button-tooltip"
        data-tooltip-content={tooltipText}
      >
        {upperText}
        <br />
        <b className="font-bold">{lowerText}</b>
      </span>
    </Button>
  );
}
