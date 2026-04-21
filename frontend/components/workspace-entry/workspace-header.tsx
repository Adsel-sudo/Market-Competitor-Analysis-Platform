export function WorkspaceHeader() {
  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-[#e8e2f3] bg-[#ffffff] px-5 lg:px-8 xl:px-12">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#8177ac]">Workspace</p>
        <p className="mt-1 text-sm font-semibold tracking-wide text-primary">Market Analysis Platform</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-secondary">
        <span className="rounded-full bg-[#f4f0ff] px-3 py-1 text-xs text-[#625988]">Iris</span>
        <button type="button" className="rounded-full px-3 py-1.5 transition hover:bg-white/80 hover:text-primary">
          退出登录
        </button>
      </div>
    </header>
  );
}
