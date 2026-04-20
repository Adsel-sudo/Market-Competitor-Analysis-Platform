import type { ReactNode } from "react";

import { cn } from "@/components/ui/utils";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
};

export function SectionContainer({ children, className }: SectionContainerProps) {
  return <section className={cn("section-container", className)}>{children}</section>;
}
