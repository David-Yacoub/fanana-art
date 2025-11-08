import { Filter } from 'lucide-react';

const baseSelectClass =
  'w-full appearance-none rounded-full border border-brand-ink/10 bg-white/80 px-4 py-3 text-sm font-medium text-brand-ink/80 shadow-sm outline-none transition focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20';

const Label = ({ children }) => (
  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-forest/70">
    {children}
  </span>
);

const WorkshopFilters = ({ filters, onChange, types, difficulties, dates, priceOptions }) => (
  <div className="rounded-[2rem] border border-brand-ink/10 bg-white/80 p-6 shadow">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest/10 text-brand-forest">
        <Filter className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-lg text-brand-ink">Znajdź idealny warsztat dla siebie</p>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-forest/70">Filtruj według zainteresowań</p>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <label className="flex flex-col gap-2">
        <Label>Typ</Label>
        <select
          value={filters.type}
          onChange={(event) => onChange({ ...filters, type: event.target.value })}
          className={baseSelectClass}
        >
          <option value="All">Wszystkie</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <Label>Poziom</Label>
        <select
          value={filters.difficulty}
          onChange={(event) => onChange({ ...filters, difficulty: event.target.value })}
          className={baseSelectClass}
        >
          <option value="All">Wszystkie</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <Label>Data</Label>
        <select
          value={filters.date}
          onChange={(event) => onChange({ ...filters, date: event.target.value })}
          className={baseSelectClass}
        >
          <option value="All">Dowolna data</option>
          {dates.map((dateOption) => (
            <option key={dateOption.value} value={dateOption.value}>
              {dateOption.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <Label>Budżet</Label>
        <select
          value={filters.price}
          onChange={(event) => onChange({ ...filters, price: event.target.value })}
          className={baseSelectClass}
        >
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  </div>
);

export default WorkshopFilters;
