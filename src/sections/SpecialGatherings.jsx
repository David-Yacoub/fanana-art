const gatherings = [
  {
    title: 'Birthday workshop',
    description: 'Celebrate with a private decoupage party. Book five or more guests to receive 20% off.',
    detail: 'Minimum 5 guests - 20% off',
    href: '#contact'
  },
  {
    title: "Women's Day workshop",
    description: 'Design a meaningful creative gathering for at least five women in your circle.',
    detail: 'Minimum 5 guests',
    href: '#contact'
  },
  {
    title: 'Gift vouchers',
    description: 'Surprise someone with a one-to-one decoupage session tailored to their schedule.',
    detail: 'Individual session',
    href: '#contact'
  },
  {
    title: 'Join the WhatsApp group',
    description: 'Get alerts about new workshops, bonus tips, and studio announcements.',
    detail: 'Community updates',
    href: 'https://chat.whatsapp.com/FananaArtCommunity',
    external: true
  }
];

const SpecialGatherings = () => (
  <section className="mt-24 px-6 sm:px-10 lg:px-12">
    <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-brand-ink/10 bg-white/80 p-10 shadow-lg backdrop-blur">
      <div className="space-y-3 text-center sm:text-left">
        <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Special gatherings</p>
        <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
          Celebrate together or share Fanana-Art as a gift
        </h2>
        <p className="text-sm leading-relaxed text-brand-ink/70">
          Choose a themed experience that fits your occasion and we&apos;ll handle the materials, setup, and
          guidance.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {gatherings.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col justify-between rounded-3xl border border-brand-ink/10 bg-white/90 p-6 text-left shadow-sm"
          >
            <div className="space-y-2">
              <span className="inline-flex rounded-full bg-brand-forest/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-forest">
                {item.detail}
              </span>
              <h3 className="font-display text-xl text-brand-ink">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-ink/75">{item.description}</p>
            </div>
            <a
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-forest hover:text-brand-forest/80"
            >
              {item.external ? 'Open link' : 'Start planning'}
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SpecialGatherings;
