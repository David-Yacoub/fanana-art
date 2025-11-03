import { useMemo, useState } from 'react';
import { NotebookPen } from 'lucide-react';
import WorkshopFilters from '../components/WorkshopFilters.jsx';
import WorkshopCard from '../components/WorkshopCard.jsx';
import { workshopTypes, workshops } from '../data/workshops.js';
import { format } from '../utils/date.js';

const priceOptions = [
  { label: 'All investment levels', value: 'All' },
  { label: 'Up to $50', value: 'under-50' },
  { label: '$50 – $70', value: '50-70' },
  { label: '$70 and above', value: 'above-70' }
];

const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];

const derivedDates = workshops
  .flatMap((workshop) => workshop.dateTimes.map((slot) => slot.date))
  .filter((value, index, array) => array.indexOf(value) === index)
  .sort();

const dateOptions = derivedDates.map((isoDate) => ({
  value: isoDate,
  label: format(isoDate)
}));

const matchesPrice = (workshop, filter) => {
  if (filter === 'All') return true;
  if (filter === 'under-50') return workshop.price <= 50;
  if (filter === '50-70') return workshop.price > 50 && workshop.price <= 70;
  if (filter === 'above-70') return workshop.price > 70;
  return true;
};

const Workshops = ({ onInterested }) => {
  const [filters, setFilters] = useState({
    type: 'All',
    difficulty: 'All',
    date: 'All',
    price: 'All'
  });

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
            <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Hands-on sessions</p>
            <h2 className="mt-2 font-display text-3xl text-brand-ink sm:text-4xl">
              Explore Our workshops
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-ink/70">
              Every workshop includes step-by-step demos, guided practice, and curated materials.
              Reserve early to secure your preferred date.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-brand-forest/10 px-4 py-2 text-sm font-medium text-brand-forest">
            <NotebookPen className="h-5 w-5" />
            Updated weekly
          </div>
        </div>

        <WorkshopFilters
          filters={filters}
          onChange={setFilters}
          types={workshopTypes}
          difficulties={difficultyOptions}
          dates={dateOptions}
          priceOptions={priceOptions}
        />

        {filteredWorkshops.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} onInterested={onInterested} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-brand-forest/30 bg-white/70 p-12 text-center">
            <p className="font-display text-2xl text-brand-forest">No workshops match those filters… yet!</p>
            <p className="mt-2 text-sm text-brand-ink/70">
              Try adjusting the filters or get in touch to request a custom session for your group.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Workshops;
