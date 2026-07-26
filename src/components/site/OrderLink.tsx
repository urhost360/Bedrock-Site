import { Link } from "@tanstack/react-router";
import type { MouseEventHandler, ReactNode } from "react";

type OrderLinkProps = {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function OrderLink({ className, children, onClick }: OrderLinkProps) {
  return (
    <Link to="/order" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
