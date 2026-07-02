export function Newsletter() {
  return (
    <form className="space-y-3">
      <label htmlFor="newsletter" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2B135]">
        Newsletter
      </label>
      <div className="flex h-11 items-center border border-white/25 bg-white/5">
        <input
          id="newsletter"
          type="email"
          placeholder="votre@email.ma"
          className="h-full flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex h-full min-w-[120px] items-center justify-center bg-[#F2B135] px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#062A4F]"
        >
          S’inscrire
        </button>
      </div>
    </form>
  );
}
