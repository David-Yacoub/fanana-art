import { useMemo } from 'react';
import { CalendarDays, Clock3, Sparkles, Wallet } from 'lucide-react';
import { workshops } from '../data/workshops.js';

const BOOKING_CONFIG = {
  formBaseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfiqikccQwYxGbdG8LOCpKB9KzWIriDWBS8vajRFQKSv-kmTg/viewform',
  entryIds: {
    workshop: 'entry.1808126251',
    date: 'entry.1207079226',
    time: 'entry.1977225055'
  }
};

const longDateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const parseDateTime = (date, time) => {
  if (!date || !time) return null;
  const parsed = new Date(`${date} ${time}`);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
};

const buildBookingFormUrl = ({ title, date, time }) => {
  if (!title || !date || !time) return BOOKING_CONFIG.formBaseUrl;

  const params = new URLSearchParams({
    usp: 'pp_url',
    [BOOKING_CONFIG.entryIds.workshop]: title,
    [BOOKING_CONFIG.entryIds.date]: date,
    [BOOKING_CONFIG.entryIds.time]: time
  });

  return `${BOOKING_CONFIG.formBaseUrl}?${params.toString()}`;
};

const Schedule = () => {
  const upcomingSessions = useMemo(() => {
    const sessions = workshops.flatMap((workshop) =>
      (workshop.dateTimes ?? []).map((slot) => {
        const start = parseDateTime(slot.date, slot.time);

        return {
          id: `${workshop.id}-${slot.date}-${slot.time}`,
          workshop,
          slot,
          start
        };
      })
    );

    const future = sessions
      .filter(({ start }) => start)
      .sort((a, b) => a.start - b.start);

    return future.slice(0, 8);
  }, []);

  return (
    <section id="schedule" className="relative mt-16 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-12 rounded-[2.5rem] border border-brand-ink/10 bg-white/85 p-8 shadow-xl backdrop-blur sm:p-12 lg:p-16">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-brand-forest/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-brand-forest">
            Plan Ahead
          </span>
          <div className="max-w-3xl space-y-3">
            <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">Workshop schedule & bookings</h2>
            <p className="text-sm leading-relaxed text-brand-ink/70">
              Browse upcoming sessions, save the dates to your calendar, and secure spots for your group in just a few clicks.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-brand-ink/10 shadow-inner">
          <iframe
            title="Fanana workshop calendar"
            src="https://calendar.google.com/calendar/embed?src=c_ae8f1ca5bfc7a8060b77f32a583dbdf7ff75fe39772db8dd28d464fd92898423%40group.calendar.google.com&ctz=Europe%2FWarsaw"
            width="100%"
            height="600"
            style={{ border: 0 }}
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Book a session</p>
              <h3 className="font-display text-2xl text-brand-ink sm:text-3xl">Reserve your seats</h3>
            </div>
            <p className="max-w-xl text-sm text-brand-ink/70">
              Choose a date that works for you. Booking opens in a new tab so you can confirm details before submitting.
            </p>
          </div>

          {upcomingSessions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingSessions.map(({ id, workshop, slot, start }) => {
                const bookingUrl = buildBookingFormUrl({
                  title: workshop.title,
                  date: slot.date,
                  time: slot.time
                });
                const priceDisplay = workshop.priceDisplay ?? `${workshop.price} PLN`;
                const longDate = start ? longDateFormatter.format(start) : slot.date;

                return (
                  <article
                    key={id}
                    className="group flex h-full flex-col justify-between rounded-3xl border border-brand-ink/10 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-forest">
                        {workshop.highlight && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-forest/10 px-3 py-1">
                            <Sparkles className="h-3.5 w-3.5" />
                            {workshop.highlight}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 rounded-full border border-brand-forest/15 px-3 py-1 text-brand-forest/80">
                          {workshop.type}
                        </span>
                      </div>
                      <h4 className="font-display text-xl text-brand-ink group-hover:text-brand-forest">
                        {workshop.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-brand-ink/70">{workshop.description}</p>
                    </div>

                    <dl className="mt-4 space-y-2 text-sm text-brand-ink/75">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-brand-forest" />
                        <div>
                          <dt className="sr-only">Date</dt>
                          <dd>{longDate}</dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-brand-forest" />
                        <div>
                          <dt className="sr-only">Time</dt>
                          <dd>
                            {slot.time} &middot; {workshop.duration}
                          </dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-brand-forest" />
                        <div>
                          <dt className="sr-only">Investment</dt>
                          <dd>{priceDisplay}</dd>
                        </div>
                      </div>
                    </dl>

                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow transition hover:bg-brand-forest/90"
                    >
                      Book this workshop
                    </a>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-brand-forest/30 bg-white/70 p-12 text-center">
              <p className="font-display text-2xl text-brand-forest">New dates coming soon</p>
              <p className="mt-2 text-sm text-brand-ink/70">
                We are setting the next round of workshops now. Check back shortly or contact us to suggest a date.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
