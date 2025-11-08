import { useEffect, useRef, useState } from "react";
import { Image, X } from "lucide-react";
import { galleryItems } from "../data/gallery.js";

const CATEGORIES = ["Wszystko", "Dzieci", "Świeczniki", "Pudełka", "Kolczyki"];

const Gallery = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Wszystko");
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    const stillVisible =
      activeCategory === "Wszystko" ||
      activeItem.categories?.includes(activeCategory);

    if (!stillVisible) {
      setActiveItem(null);
    }
  }, [activeCategory, activeItem]);

  const filteredItems =
    activeCategory === "Wszystko"
      ? galleryItems
      : galleryItems.filter((item) =>
          item.categories?.includes(activeCategory)
        );

  return (
    <section id="gallery" className="mt-24 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Galeria</p>
            <h2 className="mt-2 font-display text-3xl text-brand-ink sm:text-4xl">
              Prace uczestników i inspiracje ze studia
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-ink/75">
              Zajrzyj do świata Fanana-Art: każda praca powstała podczas warsztatów i opowiada historię cierpliwości,
              warstw oraz radości z odkrywania nowych technik.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-brand-forest/10 px-4 py-2 text-brand-forest">
            <Image className="h-5 w-5" />
            <span className="text-sm font-medium">Dotknij, aby zobaczyć detale</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 rounded-3xl bg-white/60 p-4 shadow-sm ring-1 ring-brand-ink/10">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-forest/30 ${
                  isActive
                    ? "bg-brand-forest text-white shadow-md"
                    : "bg-white/70 text-brand-ink hover:bg-brand-forest/10"
                }`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-brand-ink/10 bg-white/80 text-left shadow-sm transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-forest/30 hover:-translate-y-1 hover:shadow-2xl"
                aria-label={`Powiększ ${item.title}`}
              >
                <figure className="flex h-full flex-col">
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute inset-x-0 bottom-4 mx-4 flex items-center justify-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-forest shadow-sm transition duration-300 group-hover:-translate-y-1">
                      Zobacz z bliska
                    </span>
                  </div>
                  <figcaption className="flex flex-1 flex-col justify-between px-5 py-4">
                    <p className="font-medium text-brand-ink">{item.title}</p>
                    <span className="mt-2 text-xs uppercase tracking-[0.3em] text-brand-forest/70">Ręcznie wykonane</span>
                  </figcaption>
                </figure>
              </button>
            ))
          ) : (
            <p className="col-span-full rounded-3xl border border-dashed border-brand-forest/30 bg-white/60 px-6 py-16 text-center text-sm text-brand-ink/70">
              Brak prac w tej kategorii — sprawdź inne inspiracje.
            </p>
          )}
        </div>
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10 backdrop-blur-sm"
          onClick={() => setActiveItem(null)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${activeItem.id}-title`}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              ref={closeButtonRef}
              className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/10"
              aria-label="Zamknij podgląd"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="h-full w-full object-cover"
              />
              <div className="flex flex-col gap-4 px-6 pb-6 pt-10 lg:pt-12">
                <h3 id={`${activeItem.id}-title`} className="font-display text-2xl text-brand-ink">
                  {activeItem.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-ink/80">
                  Każdy przedmiot powstaje z połączenia pasji, cierpliwości oraz radości z twórczych eksperymentów. Powiększ,
                  aby podziwiać detale faktur, kolorów i technik, które nadają pracom unikalnego charakteru.
                </p>
                <dl className="space-y-2 text-sm text-brand-ink/70">
                  <div className="flex justify-between border-b border-brand-ink/10 pb-2">
                    <dt className="font-medium uppercase tracking-[0.25em]">Technika</dt>
                    <dd>Decoupage, postarzanie, lakierowanie</dd>
                  </div>
                  <div className="flex justify-between border-b border-brand-ink/10 pb-2">
                    <dt className="font-medium uppercase tracking-[0.25em]">Czas pracy</dt>
                    <dd>1–2 godzin</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium uppercase tracking-[0.25em]">Instruktorka</dt>
                    <dd>Fanana-Art Studio</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
