import React from "react";
import classNames from "classnames";

interface IRoundIcon {
  icon: any;
  className: string;
  iconColorClass: string;
  bgColorClass: string;
}

function RoundIcon({
  icon,
  iconColorClass = "text-blue-600 dark:text-blue-100",
  bgColorClass = "bg-blue-100 dark:bg-blue-600",
  className,
}: IRoundIcon) {
  const baseStyle = "p-3 rounded-full";
  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className);
  return <div className={cls}>{/* <Icon className="w-5 h-5" /> */}</div>;
}

export default RoundIcon;
