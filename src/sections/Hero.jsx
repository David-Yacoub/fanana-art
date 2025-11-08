import { CalendarDays, Palette, Paintbrush2, Sparkles } from 'lucide-react';
import { scheduleWorkshops } from '../data/scheduleWorkshops';
import { buildBookingFormUrl, parseWorkshopDateTime } from '../utils/bookingForm';

const featureHighlights = [
  {
    title: 'Decoupage workshops',
    copy: 'We host small-group sessions in the studio (3-8 people) and off-site workshops (3-15 people). Expect a creative time together in a cozy setting with coffee and treats.',
    image: '/images/hero_small_group.jpg',
    alt: 'Workshops for kids and adults'
  },
  {
    title: 'Materials included',
    copy: 'We provide every supply you need—paints, napkins, rice papers, specialty varnishes, crackle glues, and decorative accents. Simply arrive and let yourself be inspired.',
    image: '/images/hero_materials.jpg',
    alt: 'Professional decoupage materials'
  },
  {
    title: 'Leave with a piece you love',
    copy: 'Create your own artwork and take it home. Style your space with it or gift it to someone special.',
    image: '/images/leave_with_the_art_you_love.jpg',
    alt: 'Decorative jewelry box made during a workshop'
  }
];

const heroDateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});

const heroTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

const nearestWorkshop = (() => {
  const upcoming = scheduleWorkshops
    .map((session) => {
      const start = parseWorkshopDateTime(session.formDate, session.formTime);
      if (!start) return null;

      return {
        ...session,
        start,
        longDate: heroDateFormatter.format(start),
        shortTime: heroTimeFormatter.format(start),
        bookingUrl: buildBookingFormUrl({
          title: session.title,
          date: session.formDate,
          time: session.formTime
        })
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.start - b.start);

  return upcoming[0] ?? null;
})();

const Hero = ({ onCtaClick }) => (
  <section className="relative overflow-hidden bg-brand-cream">
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: "url('/images/gallery_lavendar_box.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
    <div className="absolute inset-0 opacity-60 mix-blend-multiply bg-paper-texture" />
    <div className="absolute inset-y-0 -left-24 hidden w-64 rotate-12 bg-white/20 blur-3xl sm:block" />
    <div className="absolute inset-y-0 -right-32 hidden w-72 -rotate-12 bg-white/20 blur-3xl lg:block" />

    <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center gap-10 px-6 py-24 sm:px-10 lg:px-12">
      <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-brand-forest/70">
        <Sparkles className="h-5 w-5" />
        Fanana-Art workshops
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="max-w-3xl flex-1 space-y-6 rounded-3xl bg-white/85 p-6 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="font-display text-4xl leading-tight text-brand-ink sm:text-5xl lg:text-6xl">
            Fanana-Art Studio
          </h1>
          <div className="flex flex-col gap-3 sm:max-w-xs">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-forest/20 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-forest shadow-sm">
              <Sparkles className="h-4 w-4" />
              Every photo shows our own work
            </div>
          </div>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-brand-ink/80 sm:text-xl">
          Discover decoupage workshops where creating with your hands and heart feels effortless. Step into a world where
          paper, colors, and textures tell stories.
        </p>
        <p className="max-w-xl text-lg leading-relaxed text-brand-ink/80 sm:text-xl">
          With the gentle guidance of our instructor, each session becomes a journey through technique, inspiration, and
          shared making. In the studio's warm, intimate atmosphere you will see how simple materials transform into
          soulful, beautiful pieces.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-forest/90"
          >
            <Paintbrush2 className="h-5 w-5" />
            View workshops
          </button>
          <a
            href="#activities"
            className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-brand-ink transition hover:border-brand-forest hover:text-brand-forest"
          >
            <Palette className="h-5 w-5" />
            Updates
          </a>
        </div>
        </div>
        {nearestWorkshop && (
          <a
            href={nearestWorkshop.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="group w-full max-w-md rounded-3xl border border-brand-forest/15 bg-white/90 p-6 text-left shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-forest/70">
              Next workshops
            </div>
            <div className="mt-4 flex items-center gap-3">
              {nearestWorkshop.image && (
                <div className="h-14 w-14 overflow-hidden rounded-2xl border border-brand-forest/20 shadow-sm">
                  <img
                    src={nearestWorkshop.image}
                    alt={nearestWorkshop.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <p className="font-display text-xl text-brand-ink group-hover:text-brand-forest">
                {nearestWorkshop.title}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-brand-ink/80">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-4 w-4 text-brand-forest" />
                {nearestWorkshop.longDate}
              </span>
              <span>&middot;</span>
              <span>{nearestWorkshop.shortTime}</span>
            </div>
            <div className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-brand-forest">
              <span>Spots available</span>
              <span className="rounded-full bg-brand-forest/10 px-3 py-1 text-brand-forest">
                {nearestWorkshop.availableSpots}/{nearestWorkshop.capacity}
              </span>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-forest">
              Go to booking
              <span aria-hidden="true">-></span>
            </span>
          </a>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureHighlights.map((feature) => (
          <div
            key={feature.title}
            className="overflow-hidden rounded-3xl border border-brand-ink/10 bg-white/80 shadow-sm"
          >
            {feature.image && (
              <div className="flex h-48 w-full items-center justify-center bg-white">
                <img
                  src={feature.image}
                  alt={feature.alt ?? feature.title}
                  className="max-h-full w-full object-contain"
                />
              </div>
            )}
            <div className="space-y-2 p-6">
              <h3 className="font-semibold text-brand-forest">{feature.title}</h3>
              <p className="mt-2 text-sm text-brand-ink/70">{feature.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
