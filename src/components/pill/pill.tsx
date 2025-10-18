import { ReactNode } from "react";
import "./pill.css";

interface PillProps {
  className: string;
  children?: ReactNode;
}

export const Pill = ({ className, children }: PillProps) => {
  return <span className={"pill " + className}>{children}</span>;
};
