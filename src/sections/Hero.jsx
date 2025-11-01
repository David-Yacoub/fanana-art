import { Palette, Paintbrush2, Sparkles } from 'lucide-react';

const featureHighlights = [
  {
    title: 'Small group sessions (3-10)',
    copy: 'Hands-on guidance in intimate classes sized for 3-10 makers so everyone gets support.',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=60',
    alt: 'Participants gathered around a creative workshop table'
  },
  {
    title: 'All materials provided',
    copy: 'Premium decoupage papers, paints, and finishes are waiting at your station - just bring yourself.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=60',
    alt: 'Curated set of decoupage papers and craft supplies'
  },
  {
    title: 'Leave with art you love',
    copy: 'Finish every session with a completed piece plus the know-how to recreate it at home.',
    image:
      'https://images.unsplash.com/photo-1466112928291-0903b80a9466?auto=format&fit=crop&w=900&q=60',
    alt: 'Handmade box being presented after a workshop'
  }
];

const Hero = ({ onCtaClick }) => (
  <section className="relative overflow-hidden bg-brand-cream">
    <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-paper-texture" />
    <div className="absolute inset-y-0 -left-24 hidden w-64 rotate-12 bg-brand-blush/60 blur-3xl sm:block" />
    <div className="absolute inset-y-0 -right-32 hidden w-72 -rotate-12 bg-brand-clay/50 blur-3xl lg:block" />

    <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center gap-10 px-6 py-24 sm:px-10 lg:px-12">
      <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-brand-forest/70">
        <Sparkles className="h-5 w-5" />
        Fanana-Art Workshops
      </div>

      <div className="max-w-3xl space-y-6">
        <h1 className="font-display text-4xl leading-tight text-brand-ink sm:text-5xl lg:text-6xl">
          Decoupage & Creative Workshops that celebrate handmade joy.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-brand-ink/80 sm:text-xl">
          Explore layered papers, textured finishes, and storytelling through art. Guided by instructor
          Fananah in Wisla, Poland, each session blends technique, inspiration, and community in a warm studio
          setting.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-forest/90"
          >
            <Paintbrush2 className="h-5 w-5" />
            View Workshops
          </button>
          <a
            href="#announcements"
            className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-brand-ink transition hover:border-brand-forest hover:text-brand-forest"
          >
            <Palette className="h-5 w-5" />
            Latest Announcements
          </a>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureHighlights.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-brand-ink/5 bg-white/60 p-6 shadow-sm backdrop-blur"
          >
            <div className="relative h-36 overflow-hidden rounded-2xl">
              <img src={feature.image} alt={feature.alt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold text-brand-forest">{feature.title}</h3>
              <p className="text-sm text-brand-ink/70">{feature.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
