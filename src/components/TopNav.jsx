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
    <nav className="z-50 bg-white shadow-sm md:sticky md:top-0">
      <div className="border-b border-brand-ink/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-brand-forest sm:px-10 sm:py-2 sm:text-xs lg:px-12">
          <div className="flex items-center gap-2">
            {languageOptions.map((option) => {
              const isActive = option.label === 'EN' ? isEnglishActive : !isEnglishActive;
              return (
                <a
                  key={option.label}
                  href={option.href}
                  className={`rounded-full px-3 py-1 transition ${
                    isActive
                      ? 'bg-brand-forest text-white'
                      : 'bg-transparent text-brand-ink hover:bg-brand-forest/10 hover:text-brand-forest'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  rel="noreferrer"
                >
                  {option.label}
                </a>
              );
            })}
          </div>
          <span className="rounded-full bg-brand-forest/10 px-3 py-1 text-[11px] tracking-normal text-brand-forest sm:text-xs">
            We organize off-site workshops for companies, schools, and events
          </span>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-3 sm:px-10 lg:px-12">
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                className="text-sm font-medium text-brand-ink/70 transition hover:text-brand-forest"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-brand-forest/10 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              className="rounded-full border border-brand-forest/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-forest transition hover:bg-brand-forest hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;




