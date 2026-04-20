import type { ReactNode } from "react";

import { cn } from "@/components/ui/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return <main className={cn("page-shell page-transition text-primary", className)}>{children}</main>;
}
