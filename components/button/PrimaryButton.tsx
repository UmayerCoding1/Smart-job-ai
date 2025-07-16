import React from "react";
import { Button } from "../ui/button";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  Icon?: React.ElementType;
  className?: string;
}

const PrimaryButton = ({
  children,
  Icon,
  className,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Button
      className={`bg-gradient-to-r from-blue-500 hover:form-blue-700 to-blue-700 hover:to-blue-900 text-white py-6 cursor-pointer ${
        className ?? ``
      }`}
      {...props}
    >
      {Icon && <Icon />}
      <span className="font-semibold">{children}</span>
    </Button>
  );
};

export default PrimaryButton;
