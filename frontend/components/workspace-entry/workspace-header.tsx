export function WorkspaceHeader() {
  return (
    <header className="flex h-[62px] w-full items-center justify-between border-b border-[#e6e1db] bg-[#fffdf9] px-5 shadow-[0_4px_12px_rgba(80,62,118,0.06)] lg:px-8 xl:px-12">
      <div>
        <p className="text-sm font-semibold tracking-wide text-primary">Market Analysis Platform</p>
      </div>
      <div className="flex items-center text-sm">
        <button
          type="button"
          className="rounded-full bg-[linear-gradient(135deg,#7967df_0%,#8c7be8_100%)] px-4 py-1.5 font-medium text-white shadow-[0_8px_16px_rgba(109,93,187,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(109,93,187,0.28)]"
        >
          退出登录
        </button>
      </div>
    </header>
  );
}
