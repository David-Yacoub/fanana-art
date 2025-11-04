const navItems = [
  { label: 'Schedule', href: '#schedule' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: 'https://ania-tdb.blogspot.com/', external: true }
];

const languageOptions = [
  { label: 'PL', href: 'https://www.fanana-art.pl' },
  { label: 'EN', href: 'https://www.fanana-art.com' }
];

const TopNav = () => {
  const isEnglishActive =
    typeof window !== 'undefined'
      ? window.location.hostname.includes('fanana-art.com') || window.location.hostname === 'localhost'
      : true;

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-ink/10 bg-white/80 backdrop-blur">
      <div className="bg-white/95">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-ink sm:text-sm sm:px-10 lg:px-12">
          {languageOptions.map((option) => {
            const isActive = option.label === 'EN' ? isEnglishActive : !isEnglishActive;
            return (
              <a
                key={option.label}
                href={option.href}
                className={`rounded-full px-4 py-1 transition ${
                  isActive
                    ? 'bg-brand-forest text-white'
                    : 'bg-white text-brand-ink hover:bg-brand-forest/10 hover:text-brand-forest'
                }`}
                aria-current={isActive ? 'page' : undefined}
                rel="noreferrer"
              >
                {option.label}
              </a>
            );
          })}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-3 sm:flex-nowrap sm:gap-3 sm:px-10 lg:px-12">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
            className="flex-1 rounded-full border border-brand-forest/20 px-4 py-2 text-center text-sm font-semibold uppercase tracking-wide text-brand-forest transition hover:bg-brand-forest hover:text-white sm:flex-none sm:px-5"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default TopNav;
