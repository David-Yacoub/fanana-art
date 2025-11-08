import { useMemo, useState } from 'react';
import { CalendarDays, Clock3, Sparkles, Users, Wallet } from 'lucide-react';
import { scheduleWorkshops } from '../data/scheduleWorkshops';
import { buildBookingFormUrl, parseWorkshopDateTime } from '../utils/bookingForm';

const longDateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const Schedule = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const upcomingSessions = useMemo(() => {
    const sessions = scheduleWorkshops
      .map((session) => {
        const start = parseWorkshopDateTime(session.formDate, session.formTime);
        return {
          ...session,
          start,
          longDate: start ? longDateFormatter.format(start) : session.formDate
        };
      })
      .sort((a, b) => {
        if (!a.start || !b.start) return 0;
        return a.start - b.start;
      });

    return sessions;
  }, []);

  return (
    <section id="schedule" className="relative mt-16 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-12 rounded-[2.5rem] border border-brand-ink/10 bg-white/85 p-8 shadow-xl backdrop-blur sm:p-12 lg:p-16">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-brand-forest/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-brand-forest">
            Plan ahead
          </span>
          <div className="max-w-3xl space-y-3">
            <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">Workshop schedule and bookings</h2>
            <p className="text-sm leading-relaxed text-brand-ink/70">
              See the upcoming sessions, add them to your calendar, and reserve a date for yourself or your group in just a few minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCalendar((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-brand-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
            aria-expanded={showCalendar}
          >
            <CalendarDays className="h-4 w-4 text-white" aria-hidden="true" />
            <span>{showCalendar ? 'Hide calendar' : 'Show calendar'}</span>
          </button>
        </div>

        {showCalendar && (
          <div className="overflow-hidden rounded-3xl border border-brand-ink/10 shadow-inner">
            <iframe
              title="Fanana-Art workshop calendar"
              src="https://calendar.google.com/calendar/embed?src=c_ae8f1ca5bfc7a8060b77f32a583dbdf7ff75fe39772db8dd28d464fd92898423%40group.calendar.google.com&ctz=Europe%2FWarsaw"
              width="100%"
              height="600"
              style={{ border: 0 }}
            />
          </div>
        )}

        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Book a date</p>
              <h3 className="font-display text-2xl text-brand-ink sm:text-3xl">Reserve space for your group</h3>
            </div>
            <p className="max-w-xl text-sm text-brand-ink/70">
              Choose the most convenient day. The booking form opens in a new tab so you can fill in every detail at your own pace.
            </p>
          </div>

          {upcomingSessions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingSessions.map(
                ({
                  id,
                  highlight,
                  title,
                  description,
                  duration,
                  priceDisplay,
                  timeRange,
                  formDate,
                  formTime,
                  longDate,
                  image,
                  availableSpots,
                  capacity
                }) => {
                  const bookingUrl = buildBookingFormUrl({
                    title,
                    date: formDate,
                    time: formTime
                  });

                  return (
                    <article
                      key={id}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-ink/10 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      {image && (
                        <div className="relative h-48">
                          <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-forest">
                            {highlight && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-brand-forest/10 px-3 py-1">
                                <Sparkles className="h-3.5 w-3.5" />
                                {highlight}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 rounded-full border border-brand-forest/15 px-3 py-1 text-brand-forest/80">
                              Creative workshop
                            </span>
                          </div>
                          <h4 className="font-display text-xl text-brand-ink group-hover:text-brand-forest">{title}</h4>
                          <p className="text-sm leading-relaxed text-brand-ink/70">{description}</p>
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
                                {timeRange} &middot; {duration}
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-brand-forest" />
                            <div>
                              <dt className="sr-only">Budget</dt>
                              <dd>{priceDisplay}</dd>
                            </div>
                          </div>
                          {typeof availableSpots === 'number' && typeof capacity === 'number' && (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-brand-forest" />
                              <div>
                                <dt className="sr-only">Seat availability</dt>
                                <dd>
                                  {availableSpots}/{capacity} spots
                                </dd>
                              </div>
                            </div>
                          )}
                        </dl>

                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow transition hover:bg-brand-forest/90"
                        >
                          Reserve a spot
                        </a>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-brand-forest/30 bg-white/70 p-12 text-center">
              <p className="font-display text-2xl text-brand-forest">New dates coming soon</p>
              <p className="mt-2 text-sm text-brand-ink/70">
                We're planning another series of workshops right now. Check back soon or write to us if you'd like to arrange
                a session for your group.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Schedule;

