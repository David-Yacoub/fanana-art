import { CalendarDays, Palette, Paintbrush2, Sparkles } from 'lucide-react';
import { scheduleWorkshops } from '../data/scheduleWorkshops';
import { buildBookingFormUrl, parseWorkshopDateTime } from '../utils/bookingForm';

const featureHighlights = [
  {
    title: 'Warsztaty decoupage',
    copy: 'Oferujemy warsztaty grupowe w pracowni (3–8 osób) oraz warsztaty wyjazdowe (3–15 osób). Z nami spędzisz kreatywny czas w miłej atmosferze, przy kawie i ciastku.',
    image: '/images/hero_small_group.jpg',
    alt: 'Warsztaty dla dzieci i dorosłych'
  },
  {
    title: 'Materiały w cenie zajęć',
    copy: 'Pracownia zapewnia wszystkie niezbędne materiały — farby, serwetki, papiery ryżowe, różne rodzaje lakierów, kleje do spękań oraz dodatki do ozdabiania. Wystarczy, że przyjdziesz i dasz się zainspirować!',
    image: '/images/hero_materials.jpg',
    alt: 'Profesjonalne materiały do decoupage'
  },
  {
    title: 'Wyjdziesz z dziełem, które pokochasz',
    copy: 'Stwórz swoje własne dzieło i zabierz je do domu. Ozdób nim swoje wnętrze lub podaruj komuś bliskiemu w prezencie.',
    image: '/images/leave_with_the_art_you_love.jpg',
    alt: 'Dekoracyjna szkatułka wykonana podczas warsztatów'
  }
];

const heroDateFormatter = new Intl.DateTimeFormat('pl-PL', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});

const heroTimeFormatter = new Intl.DateTimeFormat('pl-PL', {
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
        Warsztaty Fanana-Art
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="max-w-3xl flex-1 space-y-6 rounded-3xl bg-white/85 p-6 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="font-display text-4xl leading-tight text-brand-ink sm:text-5xl lg:text-6xl">
            Pracownia Fanana-Art
          </h1>
          <div className="flex flex-col gap-3 sm:max-w-xs">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-forest/20 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-forest shadow-sm">
              <Sparkles className="h-4 w-4" />
              Wszystkie zdjecia to nasze prace
            </div>
          </div>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-brand-ink/80 sm:text-xl">
          Warsztaty decoupage – odkryj radość tworzenia rękami i sercem. Zapraszamy do świata, w którym papier, kolory i
          faktury opowiadają historie.
        </p>
        <p className="max-w-xl text-lg leading-relaxed text-brand-ink/80 sm:text-xl">
          Pod czułym okiem instruktorki każdy warsztat staje się podróżą przez technikę, inspirację i wspólne tworzenie.
          W kameralnej, ciepłej atmosferze pracowni odkryjesz, jak z prostych materiałów powstają wyjątkowe dzieła – pełne
          duszy, pasji i piękna.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-forest/90"
          >
            <Paintbrush2 className="h-5 w-5" />
            Zobacz warsztaty
          </button>
          <a
            href="#activities"
            className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-brand-ink transition hover:border-brand-forest hover:text-brand-forest"
          >
            <Palette className="h-5 w-5" />
            Aktualności
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
              Najblizsze warsztaty
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
              <span>Dostepne miejsca</span>
              <span className="rounded-full bg-brand-forest/10 px-3 py-1 text-brand-forest">
                {nearestWorkshop.availableSpots}/{nearestWorkshop.capacity}
              </span>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-forest">
              Przejdz do rezerwacji
              <span aria-hidden="true">→</span>
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
