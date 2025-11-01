import { Facebook, Instagram, Youtube } from 'lucide-react';

const socials = [
  { id: 'instagram', label: '@fanana.art', icon: Instagram, link: 'https://instagram.com' },
  { id: 'facebook', label: 'Fanana-Art Studio', icon: Facebook, link: 'https://facebook.com' },
  { id: 'youtube', label: 'Creative Sessions', icon: Youtube, link: 'https://youtube.com' }
];

const Footer = () => (
  <footer className="mt-24 bg-brand-forest text-white">
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="font-display text-2xl">Fanana-Art</h3>
          <p className="text-sm text-white/70">
            Decoupage workshops and mixed media experiences for makers who love thoughtful details.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Studio Hours</p>
          <ul className="mt-3 space-y-1 text-sm text-white/75">
            <li>Thu - Sat: 10:00 AM - 7:00 PM</li>
            <li>Sun: 11:00 AM - 5:00 PM</li>
            <li>Private sessions by request</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Visit</p>
          <p className="mt-3 text-sm text-white/75">
            Fanana-Art Studio
            <br />
            Wisla Cultural Atelier
            <br />
            Wisla, Poland
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Connect</p>
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
        (c) {new Date().getFullYear()} Fanana-Art. Crafted with love in Wisla, Poland.
      </div>
    </div>
  </footer>
);

export default Footer;
