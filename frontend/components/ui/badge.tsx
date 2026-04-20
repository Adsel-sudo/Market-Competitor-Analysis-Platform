import * as React from "react";

import { cn } from "@/components/ui/utils";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "blue" | "amber" | "green";
};

const toneMap: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-white/70 text-secondary border border-[color:var(--border-soft)]",
  blue: "bg-[color:var(--accent-soft)] text-[color:var(--accent-primary)]",
  amber: "bg-[color:var(--warning-soft)] text-[color:var(--warning-text)]",
  green: "bg-[color:var(--success-soft)] text-[color:var(--success-text)]",
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium", toneMap[tone], className)}
      {...props}
    />
  );
}
