export function WorkspaceHeader() {
  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-[#e8e2f3] bg-[#f6f0ff] px-5 shadow-[0_6px_18px_rgba(89,72,140,0.08)] lg:px-8 xl:px-12">
      <div>
        <p className="text-sm font-semibold tracking-wide text-primary">Market Analysis Platform</p>
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
