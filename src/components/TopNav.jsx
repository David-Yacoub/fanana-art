const navItems = [
  { label: 'Workshops', href: '#workshops' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: 'https://ania-tdb.blogspot.com/', external: true }
];

const TopNav = () => (
  <nav className="sticky top-0 z-50 border-b border-brand-ink/10 bg-white/90 backdrop-blur">
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

export default TopNav;
