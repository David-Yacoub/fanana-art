import { useMemo, useState } from 'react';
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
  Advanced: 'bg-rose-50 text-rose-700 border-rose-100',
  'Poczatkujacy': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Srednio zaawansowany': 'bg-amber-50 text-amber-700 border-amber-100',
  'Zaawansowany': 'bg-rose-50 text-rose-700 border-rose-100'
};

const toIsoFromDateTime = (date, time) => {
  if (!date || !time) return null;
  const parsed = new Date(`${date} ${time}`);
  if (Number.isNaN(parsed.valueOf())) {
    return null;
  }
  return parsed.toISOString();
};

const WorkshopCard = ({ workshop, onInterested }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const upcomingSlots = Array.isArray(workshop.dateTimes) ? workshop.dateTimes : [];

  const schedulesFromDateTimes = upcomingSlots
    .map((slot) => toIsoFromDateTime(slot.date, slot.time))
    .filter(Boolean);

  const normalizedEvent =
    schedulesFromDateTimes.length > 0
      ? { ...workshop, schedules: schedulesFromDateTimes }
      : workshop;

  const dateIso = pickUpcomingDate(normalizedEvent);
  const bookingUrl =
    workshop.bookingUrl ||
    buildBookingUrl({
      title: workshop.title,
      dateIso
    });
  const hasContactCta = typeof onInterested === 'function';
  const priceDisplay =
    workshop.priceDisplay ??
    (typeof workshop.price === 'number' ? `${workshop.price} PLN` : 'To be confirmed');
  const ctaLabel = hasContactCta ? 'Skontaktuj sie z nami' : workshop.ctaLabel ?? 'Reserve a spot';
  const ctaDisabledLabel = workshop.ctaDisabledLabel ?? ctaLabel;

  const normalizedDescription = (workshop.description ?? '').trim();

  const shouldTruncateDescription = normalizedDescription.length > 220;

  const truncatedDescription = useMemo(() => {
    if (!shouldTruncateDescription) return normalizedDescription;
    const slice = normalizedDescription.slice(0, 220);
    const lastSpace = slice.lastIndexOf(' ');
    const safeSlice = lastSpace > 180 ? slice.slice(0, lastSpace) : slice;
    return `${safeSlice.trimEnd()}...`;
  }, [normalizedDescription, shouldTruncateDescription]);

  const descriptionToDisplay =
    shouldTruncateDescription && !isDescriptionExpanded
      ? truncatedDescription
      : normalizedDescription;

  const isDisabled = !hasContactCta && !bookingUrl;

  const handleContactClick = () => {
    if (hasContactCta) {
      onInterested(workshop);
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-ink/10 bg-white/80 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-white">
        <img
          src={workshop.image}
          alt={workshop.title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/20 to-transparent" />
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

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex min-h-[200px] flex-col gap-3 text-sm leading-relaxed text-brand-ink/75">
          <h3 className="font-display text-2xl text-brand-ink">{workshop.title}</h3>
          <p>{descriptionToDisplay}</p>
          {shouldTruncateDescription && (
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded((previous) => !previous)}
              className="mt-2 self-start text-sm font-semibold text-brand-forest transition hover:text-brand-forest/80"
            >
              {isDescriptionExpanded ? 'Hide description' : 'Read more'}
            </button>
          )}
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
              <dt className="font-semibold text-brand-forest">Budget</dt>
              <dd>
                {priceDisplay}
                {Array.isArray(workshop.pricingDetails) && workshop.pricingDetails.length > 0 && (
                  <ul className="mt-1 space-y-1 text-xs text-brand-ink/60">
                    {workshop.pricingDetails.map((line) => (
                      <li key={`${workshop.id}-${line}`}>{line}</li>
                    ))}
                  </ul>
                )}
              </dd>
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
              <dt className="font-semibold text-brand-forest">Next dates</dt>
              <dd className="space-y-1">
                {upcomingSlots.map((slot, index) => {
                  const key = slot.display ?? `${slot.date ?? 'unscheduled'}-${slot.time ?? index}`;
                  const label =
                    slot.display ??
                    (() => {
                      if (!slot?.date) {
                        return 'Date to be arranged';
                      }
                      const formatted = format(slot.date);
                      if (!slot?.time) {
                        return formatted;
                      }
                      return `${formatted} - ${slot.time}`;
                    })();
                  return <p key={`${workshop.id}-${key}`}>{label}</p>;
                })}
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-auto">
          {isDisabled ? (
            <span
              aria-disabled="true"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white opacity-50"
            >
              {ctaDisabledLabel}
            </span>
          ) : hasContactCta ? (
            <button
              type="button"
              onClick={handleContactClick}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow transition hover:bg-brand-forest/90"
              aria-label={`${ctaLabel} - ${workshop.title}`}
            >
              {ctaLabel}
            </button>
          ) : (
            <a
              href={bookingUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow transition hover:bg-brand-forest/90"
              aria-label={`${ctaLabel} - ${workshop.title}`}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default WorkshopCard;










