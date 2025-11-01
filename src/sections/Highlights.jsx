const quickLinks = [
  {
    id: 'workshops',
    title: 'View Workshops',
    copy: 'Browse upcoming sessions, filter by level, and reserve your seat.',
    href: '#workshops',
    cta: 'Explore workshops',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=60',
    alt: 'Instructor guiding students during an art workshop'
  },
  {
    id: 'gallery',
    title: 'Gallery',
    copy: 'See finished pieces from recent classes and get inspired for your own project.',
    href: '#gallery',
    cta: 'View gallery',
    image:
      'https://images.unsplash.com/photo-1520443241134-65b24c76ae5c?auto=format&fit=crop&w=900&q=60',
    alt: 'Display of handcrafted decorative objects'
  },
  {
    id: 'blog',
    title: 'Blog and Stories',
    copy: 'Catch studio highlights, seasonal tips, and behind-the-scenes updates.',
    href: '#announcements',
    cta: 'Read updates',
    image:
      'https://images.unsplash.com/photo-1484981031854-023ada4eff56?auto=format&fit=crop&w=900&q=60',
    alt: 'Artist writing notes about creative projects'
  }
];

const offers = [
  {
    id: 'birthday',
    title: 'Birthday workshop',
    copy: 'Gather a group of at least five friends and unlock a 20% celebration discount.',
    note: 'Minimum 5 guests | 20% off',
    href: '#contact',
    cta: 'Plan a birthday session',
    image:
      'https://images.unsplash.com/photo-1546015720-b8b30df5aa38?auto=format&fit=crop&w=900&q=60',
    alt: 'Friends celebrating with handcrafted gifts'
  },
  {
    id: 'womens-day',
    title: "Women's Day workshop",
    copy: 'Honour the women in your circle with a creative gathering tailored for at least five makers.',
    note: 'Minimum 5 guests',
    href: '#contact',
    cta: "Book Women's Day",
    image:
      'https://images.unsplash.com/photo-1529672472955-66b249504b13?auto=format&fit=crop&w=900&q=60',
    alt: 'Women collaborating on artwork at a table'
  },
  {
    id: 'voucher',
    title: 'Gift vouchers',
    copy: 'Surprise someone with a one-to-one decoupage session that fits their schedule.',
    note: 'Individual session',
    href: '#contact',
    cta: 'Buy a gift voucher',
    image:
      'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?auto=format&fit=crop&w=900&q=60',
    alt: 'Gift box with ribbon and handmade tag'
  },
  {
    id: 'whatsapp',
    title: 'Join the WhatsApp group',
    copy: 'Receive workshop openings, bonus tips, and behind-the-scenes previews.',
    note: 'Community updates',
    href: 'https://chat.whatsapp.com/FananaArtCommunity',
    cta: 'Join the group',
    image:
      'https://images.unsplash.com/photo-1512756290469-23103b54f0c1?auto=format&fit=crop&w=900&q=60',
    alt: 'Smartphone displaying a group chat',
    external: true
  }
];

const Card = ({ item }) => (
  <article className="group relative overflow-hidden rounded-3xl border border-brand-ink/10 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div className="relative h-44 overflow-hidden">
      <img
        src={item.image}
        alt={item.alt}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent" />
    </div>
    <div className="space-y-3 p-6">
      {item.note && (
        <span className="inline-flex rounded-full bg-brand-forest/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-forest">
          {item.note}
        </span>
      )}
      <h3 className="font-display text-2xl text-brand-ink">{item.title}</h3>
      <p className="text-sm leading-relaxed text-brand-ink/75">{item.copy}</p>
      <a
        href={item.href}
        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-forest transition hover:text-brand-forest/80"
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noreferrer' : undefined}
      >
        {item.cta}
        <span aria-hidden="true">-&gt;</span>
      </a>
    </div>
  </article>
);

const Highlights = () => (
  <section className="mt-24 px-6 sm:px-10 lg:px-12">
    <div className="mx-auto max-w-6xl space-y-12">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Start exploring</p>
        <h2 className="mt-2 font-display text-3xl text-brand-ink sm:text-4xl">
          View workshops, gallery, and blog updates
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-ink/75">
          Jump straight to the experiences you care about most - reserve your spot, preview finished pieces,
          or read the latest studio stories.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Special gatherings</p>
        <h3 className="mt-2 font-display text-2xl text-brand-ink sm:text-3xl">
          Celebrate with themed workshops or share Fanana-Art as a gift
        </h3>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  </section>
);

export default Highlights;
