import { useEffect, useMemo, useState } from 'react';

const formatter = new Intl.DateTimeFormat('pl-PL', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Europe/Warsaw'
});

const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl border border-brand-ink/10 bg-white/70 p-4">
    <div className="h-4 w-1/3 rounded bg-brand-ink/10" />
    <div className="mt-3 h-5 w-2/3 rounded bg-brand-ink/10" />
    <div className="mt-4 flex justify-end">
      <div className="h-9 w-24 rounded-full bg-brand-ink/10" />
    </div>
  </div>
);

const UpcomingSessions = () => {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        const response = await fetch('/events.json', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();

        if (!isMounted) return;

        const now = new Date();
        const upcoming = data
          .filter((event) => {
            const startsAt = new Date(event.start);
            return !Number.isNaN(startsAt.valueOf()) && startsAt > now;
          })
          .sort((a, b) => new Date(a.start) - new Date(b.start));

        setEvents(upcoming);
        setStatus('success');
      } catch (error) {
        console.error('Failed to load events:', error);
        if (isMounted) {
          setStatus('error');
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const content = useMemo(() => {
    if (status === 'loading') {
      return (
        <div className="mt-6 space-y-4">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }

    if (status === 'error') {
      return <p className="mt-6 text-sm font-medium text-rose-600">Nie udało się wczytać terminów.</p>;
    }

    if (events.length === 0) {
      return <p className="mt-6 text-sm text-brand-ink/70">Brak zaplanowanych warsztatów.</p>;
    }

    return (
      <ul className="mt-6 space-y-4">
        {events.map((event) => {
          const startsAt = new Date(event.start);
          const formattedDate = formatter.format(startsAt);
          const details = [
            formattedDate,
            event.city,
            event.pricePLN != null ? `${event.pricePLN} PLN` : null
          ]
            .filter(Boolean)
            .join(' • ');

          return (
            <li
              key={event.id}
              role="article"
              tabIndex={0}
              className="focus-visible:outline-brand-forest focus-visible:ring-brand-forest/40 focus-visible:ring-offset-brand-cream group rounded-2xl border border-brand-ink/10 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <h3 className="font-display text-lg text-brand-ink group-hover:text-brand-forest">
                    {event.title}
                  </h3>
                  <p className="text-sm text-brand-ink/70">{details}</p>
                  {event.seatsLeft != null && (
                    <p className="text-xs font-medium uppercase tracking-wide text-brand-forest">
                      Dostępne miejsca: {event.seatsLeft}
                    </p>
                  )}
                </div>
                <div className="flex justify-end sm:w-40">
                  <a
                    href={event.bookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-brand-forest px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-brand-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-forest sm:w-auto"
                    aria-label={`Zapisz się na ${event.title}`}
                  >
                    Zapisz się
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }, [events, status]);

  return (
    <section aria-labelledby="upcoming" className="mt-24 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-brand-ink/10 bg-white/80 p-6 shadow-lg backdrop-blur">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Harmonogram</p>
          <h2 id="upcoming" className="font-display text-3xl text-brand-ink">
            Najbliższe warsztaty
          </h2>
          <p className="text-sm text-brand-ink/70">
            Rezerwuj miejsce, zanim zapełnią się wszystkie terminy. Każde spotkanie obejmuje materiały i opiekę
            instruktora.
          </p>
        </div>
        {content}
      </div>
    </section>
  );
};

export default UpcomingSessions;
