import React from "react";

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-4xl",
};

export const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  filled = false,
  size = "md",
}) => {
  const sizeClass = sizeMap[size];
  const fillClass = filled ? "material-symbols-outlined-filled" : "";

  return (
    <span
      className={`material-symbols-outlined ${sizeClass} ${fillClass} ${className}`}
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
    >
      {name}
    </span>
  );
};

export default Icon;
