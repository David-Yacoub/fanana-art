import {
  CalendarDays,
  Clock3,
  SignalHigh,
  Sparkles,
  Wallet
} from 'lucide-react';
import { format } from '../utils/date.js';
import { buildBookingUrl, pickUpcomingDate } from '../utils/formPrefill.js';

const difficultyBadge = {
  Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-100',
  Advanced: 'bg-rose-50 text-rose-700 border-rose-100'
};

const toIsoFromDateTime = (date, time) => {
  if (!date || !time) return null;
  const parsed = new Date(`${date} ${time}`);
  if (Number.isNaN(parsed.valueOf())) {
    return null;
  }
  return parsed.toISOString();
};

const WorkshopCard = ({ workshop, onInterested: _onInterested }) => {
  const schedulesFromDateTimes = Array.isArray(workshop.dateTimes)
    ? workshop.dateTimes
        .map((slot) => toIsoFromDateTime(slot.date, slot.time))
        .filter(Boolean)
    : [];

  const normalizedEvent =
    schedulesFromDateTimes.length > 0
      ? { ...workshop, schedules: schedulesFromDateTimes }
      : workshop;

  const dateIso = pickUpcomingDate(normalizedEvent);
  const bookingUrl = buildBookingUrl({
    title: workshop.title,
    dateIso,
    city: workshop.city ?? workshop.location?.city ?? ''
  });
  const isDisabled = !bookingUrl;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-brand-ink/10 bg-white/80 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative h-56 overflow-hidden"
        style={{
          backgroundImage: `url(${workshop.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/20 to-transparent" />
        <div className="absolute bottom-5 left-5 flex flex-wrap items-center gap-2 text-sm font-semibold text-white drop-shadow">
          <span
            className={`rounded-full border px-3 py-1 ${difficultyBadge[workshop.difficulty] ?? ''}`}
          >
            {workshop.difficulty}
          </span>
          <span className="rounded-full border border-white/30 px-3 py-1 backdrop-blur">
            {workshop.type}
          </span>
        </div>
        {workshop.highlight && (
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-forest shadow">
            <Sparkles className="h-4 w-4" />
            {workshop.highlight}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 p-6">
        <div>
          <h3 className="font-display text-2xl text-brand-ink">{workshop.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-ink/75">{workshop.description}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm text-brand-ink/70">
          <div className="flex items-center gap-2 rounded-2xl bg-brand-cream/60 px-3 py-2">
            <Clock3 className="h-4 w-4 text-brand-forest" />
            <div>
              <dt className="font-semibold text-brand-forest">Duration</dt>
              <dd>{workshop.duration}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-brand-cream/60 px-3 py-2">
            <Wallet className="h-4 w-4 text-brand-forest" />
            <div>
              <dt className="font-semibold text-brand-forest">Investment</dt>
              <dd>${workshop.price}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-brand-cream/60 px-3 py-2">
            <SignalHigh className="h-4 w-4 text-brand-forest" />
            <div>
              <dt className="font-semibold text-brand-forest">Level</dt>
              <dd>{workshop.difficulty}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-2xl bg-brand-cream/60 px-3 py-2">
            <CalendarDays className="mt-0.5 h-4 w-4 text-brand-forest" />
            <div>
              <dt className="font-semibold text-brand-forest">Upcoming</dt>
              <dd className="space-y-1">
                {workshop.dateTimes.map((slot) => (
                  <p key={`${workshop.id}-${slot.date}-${slot.time}`}>{format(slot.date)} - {slot.time}</p>
                ))}
              </dd>
            </div>
          </div>
        </dl>

        {isDisabled ? (
          <span
            aria-disabled="true"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white opacity-50"
          >
            Zapisz się
          </span>
        ) : (
          <a
            href={bookingUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow transition hover:bg-brand-forest/90"
            aria-label={`Zapisz się na ${workshop.title}`}
          >
            Zapisz się
          </a>
        )}
      </div>
    </article>
  );
};

export default WorkshopCard;
