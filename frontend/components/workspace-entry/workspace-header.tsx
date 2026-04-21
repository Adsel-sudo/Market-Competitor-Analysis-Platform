export function WorkspaceHeader() {
  return (
    <header className="relative flex w-full justify-center px-5 pt-4 lg:px-8 lg:pt-5 xl:px-12">
      <div className="glass-card flex w-full max-w-[1620px] items-center justify-between rounded-[30px] px-6 py-3 lg:px-8">
        <p className="text-sm font-semibold tracking-wide text-[#8f8898]">Market Analysis Platform</p>
        <button
          type="button"
          className="rounded-full bg-[linear-gradient(135deg,#7967df_0%,#8c7be8_100%)] px-4 py-1.5 text-sm font-medium text-white shadow-[0_8px_16px_rgba(109,93,187,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(109,93,187,0.28)]"
        >
          退出登录
        </button>
      </div>
    </header>
  );
}
