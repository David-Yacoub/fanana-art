import { useEffect, useMemo, useState } from 'react';
import { Sparkles, Megaphone, Gift, Flower } from 'lucide-react';

const iconMap = {
  offer: Gift,
  info: Megaphone,
  new: Flower
};

const AnnouncementCard = ({ announcement }) => {
  const Icon = iconMap[announcement.type] ?? Megaphone;

  const tone =
    announcement.emphasis === 'high'
      ? 'border-brand-forest/20 bg-brand-forest/90 text-white'
      : 'border-brand-ink/10 bg-white/70';

  return (
    <article className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-sm transition ${tone}`}>
      {announcement.image && (
        <div className="mb-5 overflow-hidden rounded-2xl">
          <img src={announcement.image} alt={announcement.title} className="h-36 w-full object-cover" />
        </div>
      )}
      <div className="flex items-start gap-4">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow ${
            announcement.emphasis === 'high'
              ? 'bg-white/20 text-white'
              : 'bg-brand-blush/60 text-brand-forest'
          }`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <div className="space-y-2">
          <h3 className="font-display text-xl">{announcement.title}</h3>
          <p className="text-sm leading-relaxed">{announcement.message}</p>
        </div>
      </div>
      <div className="mt-6">
        <a
          href={announcement.link ?? '#contact'}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
            announcement.emphasis === 'high'
              ? 'bg-white/90 text-brand-forest hover:bg-white'
              : 'bg-brand-forest text-white hover:bg-brand-forest/90'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          {announcement.cta ?? 'Learn More'}
        </a>
      </div>
    </article>
  );
};

const Announcements = ({ data }) => {
  const [active, setActive] = useState(0);
  const delay = 6000;

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((idx) => (idx + 1) % data.length);
    }, delay);
    return () => clearInterval(timer);
  }, [data.length]);

  const sortedAnnouncements = useMemo(() => {
    const rank = (item) => (item.emphasis === 'high' ? 0 : 1);
    return [...data].sort((a, b) => rank(a) - rank(b));
  }, [data]);

  return (
    <section id="announcements" className="relative z-[1] mt-16 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-brand-ink/10 bg-white/70 p-8 shadow-xl backdrop-blur">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Announcements</p>
            <h2 className="mt-2 font-display text-3xl text-brand-ink">
              Latest news & seasonal highlights
            </h2>
          </div>
          <div className="flex gap-2 self-end sm:self-center">
            {sortedAnnouncements.map((announcement, idx) => (
              <button
                key={announcement.id}
                onClick={() => setActive(idx)}
                className={`h-2 w-10 rounded-full transition ${
                  active === idx ? 'bg-brand-forest' : 'bg-brand-forest/20 hover:bg-brand-forest/40'
                }`}
              >
                <span className="sr-only">Show {announcement.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <AnnouncementCard announcement={sortedAnnouncements[active]} />
          <div className="hidden sm:grid">
            {sortedAnnouncements
              .filter((_, idx) => idx !== active)
              .slice(0, 1)
              .map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
