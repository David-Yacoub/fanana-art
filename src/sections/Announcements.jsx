import { Gift, Megaphone, Flower } from 'lucide-react';

const iconMap = {
  offer: Gift,
  info: Megaphone,
  new: Flower
};

const badgeCopy = {
  offer: 'Offer',
  info: 'Update',
  new: 'New'
};

const Announcements = ({ data }) => {
  const sorted = [...data].sort((a, b) => (a.priority ?? 1) - (b.priority ?? 1));

  return (
    <section id="announcements" className="mt-16 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-8 rounded-[2.5rem] border border-brand-ink/10 bg-white/80 p-10 shadow-lg backdrop-blur">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Announcements</p>
          <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
            What&apos;s new at Fanana-Art
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-brand-ink/70">
            Quick highlights for upcoming offers, new courses, and ways to stay connected with the studio.
          </p>
        </div>

        <div className="space-y-4">
          {sorted.map((announcement) => {
            const Icon = iconMap[announcement.type] ?? Megaphone;

            return (
              <article
                key={announcement.id}
                className="rounded-3xl border border-brand-ink/10 bg-white/90 p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-brand-forest">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest/10">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="rounded-full border border-brand-forest/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    {badgeCopy[announcement.type] ?? 'Update'}
                  </span>
                  {announcement.note && (
                    <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-medium text-brand-forest/80">
                      {announcement.note}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl text-brand-ink">{announcement.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/75">
                  {announcement.description}
                </p>
                {announcement.ctaLabel && (
                  <a
                    href={announcement.ctaHref ?? '#contact'}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-forest transition hover:text-brand-forest/80"
                  >
                    {announcement.ctaLabel}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
