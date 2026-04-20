import * as React from "react";

import { cn } from "@/components/ui/utils";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "blue" | "amber" | "green";
};

const toneMap: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-slate-100 text-slate-700",
  blue: "bg-blue-50 text-blue-700",
  amber: "bg-amber-50 text-amber-700",
  green: "bg-emerald-50 text-emerald-700",
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        toneMap[tone],
        className,
      )}
      {...props}
    />
  );
}
