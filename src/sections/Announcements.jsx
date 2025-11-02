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
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-brand-ink/10 bg-white/85 shadow-xl backdrop-blur">
        <div className="absolute -top-32 -right-20 h-64 w-64 rounded-full bg-brand-blush/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-24 h-56 w-56 rounded-full bg-brand-forest/10 blur-3xl" />

        <div className="relative space-y-10 px-8 py-12 sm:px-12 lg:px-16">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex rounded-full bg-brand-forest/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-brand-forest">
              Announcements
            </span>
            <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
              What&apos;s new at Fanana-Art
            </h2>
            <p className="text-sm leading-relaxed text-brand-ink/70">
              Stay in the loop with current offers, outreach programmes, and special gatherings you can join
              right now.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {sorted.map((announcement) => {
              const Icon = iconMap[announcement.type] ?? Megaphone;

              return (
                <article
                  key={announcement.id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-ink/10 bg-white/95 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  aria-label={announcement.title}
                >
                  {announcement.image && (
                    <div className="flex h-48 w-full items-center justify-center bg-white">
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="max-h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <div className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-brand-forest/20 transition group-hover:bg-brand-forest/40" />
                  <div className="space-y-4 p-6">
                    <div className="flex items-start gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-forest/10 text-brand-forest">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-forest">
                          <span className="rounded-full bg-brand-forest/10 px-3 py-1">
                            {badgeCopy[announcement.type] ?? 'Update'}
                          </span>
                          {announcement.note && (
                            <span className="rounded-full border border-brand-forest/15 px-3 py-1 text-brand-forest/80">
                              {announcement.note}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl text-brand-ink group-hover:text-brand-forest">
                          {announcement.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-ink/75">
                      {announcement.description}
                    </p>
                    {announcement.ctaLabel && (
                      <a
                        href={announcement.ctaHref ?? '#contact'}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-forest transition hover:text-brand-forest/80"
                      >
                        {announcement.ctaLabel}
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
