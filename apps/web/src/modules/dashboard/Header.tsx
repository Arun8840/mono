import React, { ReactNode } from "react";

interface HeaderProps {
  title: string;
  description: string;
  event: ReactNode;
}
const Header = ({ title, description, event }: HeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h1 className="font-medium">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {event}
    </div>
  );
};

export default Header;
