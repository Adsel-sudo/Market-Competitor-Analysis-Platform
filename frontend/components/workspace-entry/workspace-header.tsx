export function WorkspaceHeader() {
  return (
    <header className="flex h-[60px] w-full items-center justify-between border-b border-black/5 bg-[#fcfcfb] px-5 lg:px-10">
      <p className="text-sm font-semibold tracking-wide text-primary">Market Analysis Platform</p>
      <div className="flex items-center gap-2 text-sm text-secondary">
        <span>Iris</span>
        <span className="text-black/25">|</span>
        <button type="button" className="transition hover:text-primary">
          退出登录
        </button>
      </div>
    </header>
  );
}
