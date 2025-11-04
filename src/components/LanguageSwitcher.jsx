const LanguageSwitcher = () => {
  const handlePolishRedirect = () => {
    window.location.href = 'https://www.fanana-art.com';
  };

  return (
    <div className="bg-brand-forest/15 text-brand-forest">
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wide sm:px-10 lg:px-12">
        <span className="hidden sm:inline">Language</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-current="true"
            aria-label="English (current language)"
            className="rounded-full border border-brand-forest bg-white px-3 py-1 text-brand-forest transition"
          >
            EN
          </button>
          <button
            type="button"
            onClick={handlePolishRedirect}
            className="rounded-full border border-brand-forest/50 px-3 py-1 text-brand-forest transition hover:bg-brand-forest hover:text-white"
          >
            PL
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
