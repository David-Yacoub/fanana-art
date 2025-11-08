import { Facebook, Instagram, BookOpen } from 'lucide-react';

const socials = [
  { id: 'instagram', label: 'Instagram @fanana.art', icon: Instagram, link: 'https://www.instagram.com/fanana_art.workshop/' },
  { id: 'facebook', label: 'Fanana-Art na Facebooku', icon: Facebook, link: 'https://www.facebook.com/profile.php?id=61583522277270' },
  { id: 'blog', label: 'Nasz Blog', icon: BookOpen, link: 'https://ania-tdb.blogspot.com/' }
];

const Footer = () => (
  <footer className="mt-24 bg-brand-forest text-white">
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="font-display text-2xl">Fanana-Art</h3>
          <p className="text-sm text-white/70">
            Warsztaty decoupage i mieszanych technik dla osób, które kochają dopracowane detale i ciepłą atmosferę.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Godziny pracowni</p>
          <ul className="mt-3 space-y-1 text-sm text-white/75">
          
            <li></li>
            <li></li>
            <li>Zajęcia indywidualne na życzenie</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Odwiedź nas</p>
          <p className="mt-3 text-sm text-white/75">
            Pracownia Fanana-Art
            <br />
            Centrum Wisły
            <br />
            Wisła, Polska
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Bądźmy w kontakcie</p>
          <ul className="mt-4 space-y-3 text-sm">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.link}
                  className="flex items-center gap-3 text-white/80 transition hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-4 text-xs text-white/60">
        © {new Date().getFullYear()} Fanana-Art. Tworzymy z miłością w Wiśle.
      </div>
    </div>
  </footer>
);

export default Footer;
