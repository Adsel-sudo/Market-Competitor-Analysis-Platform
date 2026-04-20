import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/components/ui/utils";

export function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("glass-card p-5", className)}>{children}</div>;
}

export function PrimaryButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("btn-primary", className)} {...props} />;
}

export function SecondaryButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("btn-secondary", className)} {...props} />;
}

export function Tag({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cn("ui-tag", className)}>{children}</span>;
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("ui-input", className)} {...props} />;
}

type SidebarItemProps = {
  title: string;
  hint?: string;
  active?: boolean;
};

export function SidebarItem({ title, hint, active = false }: SidebarItemProps) {
  return (
    <button type="button" className="sidebar-item" data-active={active}>
      <span>{title}</span>
      {hint ? <span className="text-xs opacity-80">{hint}</span> : null}
    </button>
  );
}
