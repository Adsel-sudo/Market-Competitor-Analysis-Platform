export function WorkspaceHeader() {
  return (
    <header className="glass-card flex items-center justify-between px-6 py-3.5">
      <p className="text-sm font-semibold tracking-wide text-primary">Market Analysis Platform</p>
      <div className="flex items-center gap-2 text-xs text-secondary">
        <span className="rounded-full bg-white/70 px-2.5 py-1">Iris</span>
        <button
          type="button"
          className="rounded-full bg-white/65 px-2.5 py-1 transition hover:bg-white/90 hover:text-primary"
        >
          退出登录
        </button>
      </div>
    </header>
  );
}
