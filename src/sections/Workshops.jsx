import { useMemo, useState } from 'react';
import { NotebookPen } from 'lucide-react';
import WorkshopCard from '../components/WorkshopCard.jsx';
import { workshops } from '../data/workshops.js';

const matchesPrice = (workshop, filter) => {
  if (filter === 'All') return true;
  if (filter === 'under-50') return workshop.price <= 50;
  if (filter === '50-70') return workshop.price > 50 && workshop.price <= 70;
  if (filter === 'above-70') return workshop.price > 70;
  return true;
};

const Workshops = ({ onInterested }) => {
  const [filters] = useState(() => ({
    type: 'All',
    difficulty: 'All',
    date: 'All',
    price: 'All'
  }));

  const filteredWorkshops = useMemo(
    () =>
      workshops.filter((workshop) => {
        const matchesType = filters.type === 'All' || workshop.type === filters.type;
        const matchesDifficulty =
          filters.difficulty === 'All' || workshop.difficulty === filters.difficulty;
        const matchesDate =
          filters.date === 'All' ||
          workshop.dateTimes.some((slot) => slot.date === filters.date);
        const hasPrice = matchesPrice(workshop, filters.price);
        return matchesType && matchesDifficulty && matchesDate && hasPrice;
      }),
    [filters]
  );

  return (
    <section id="workshops" className="relative mt-24 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Workshops in practice</p>
            <h2 className="mt-2 font-display text-4xl text-brand-ink sm:text-5xl">Discover our workshops</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-ink/70">
              Every session includes step-by-step demos, instructor-led practice, and carefully selected materials.
              Reserve ahead of time to secure the date that suits you best.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-brand-forest/10 px-4 py-2 text-sm font-medium text-brand-forest">
            <NotebookPen className="h-5 w-5" />
            Updated every week
          </div>
        </div>

        {filteredWorkshops.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} onInterested={onInterested} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-brand-forest/30 bg-white/70 p-12 text-center">
            <p className="font-display text-2xl text-brand-forest">No workshop matches those filters... yet!</p>
            <p className="mt-2 text-sm text-brand-ink/70">
              Try adjusting the filters or contact us to suggest a date for your group.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Workshops;
