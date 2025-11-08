import { Feather, Heart, Star } from 'lucide-react';

const pillars = [
  {
    icon: Feather,
    title: 'Studio mantra',
    copy: 'Every piece is a work of art, crafted with passion and heart.'
  },
  {
    icon: Star,
    title: 'We provide',
    copy: 'A warm atmosphere, free parking, plus coffee, tea, and a treat for every guest.'
  },
  {
    icon: Heart,
    title: 'Studio motto',
    copy: 'Creativity is not a hobby—it is the way we choose to see the world.'
  }
];

const About = () => (
  <section id="about" className="mt-24 px-6 sm:px-10 lg:px-12">
    <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-brand-ink/10 bg-white/80 p-10 shadow-lg backdrop-blur">
      <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">About Fanana-Art</p>
          <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
            Ania - an artist with passion, a mentor with heart
          </h2>
          <p className="text-sm leading-relaxed text-brand-ink/75">
            Years ago, while strolling through the market in Wisla, Ania paused at a decoupage stall and created her first
            small box. She returned home with a tiny starter kit, and that spark became the beginning of her adventure with
            the technique. Today, more than fifteen years later, decoupage is still one of her favorite forms of creative
            expression. She has led many workshops that support different missions and community initiatives, always sharing
            passion, openness, and warmth that inspire others to discover their own creativity.
          </p>
          <p className="text-sm leading-relaxed text-brand-ink/75">
            The entire idea—workshops, the studio, and the name Fanana-Art—grew from her husband's encouragement to keep
            developing and share her craft. The word "Fanana" comes from Arabic and means "female artist." It honors her
            husband's Egyptian roots and the ten years Ania spent living in Egypt. That blend of cultures became the
            inspiration for a brand with an Arabic soul and European sensitivity.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-brand-ink/10 bg-brand-cream/60 p-5 text-sm text-brand-ink/80"
              >
                <item.icon className="mb-3 h-6 w-6 text-brand-forest" />
                <h3 className="font-semibold text-brand-forest">{item.title}</h3>
                <p className="mt-2 leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-ink/10 shadow-lg">
            <img
              src="./images/group_image.jpg"
              alt="Instructor preparing materials for a decoupage workshop"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-forest/10" />
          </div>
          <div className="absolute -bottom-8 -left-6 rounded-3xl border border-brand-forest/20 bg-white/90 px-6 py-4 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-forest/60">Since 2010</p>
            <p className="mt-1 font-display text-xl text-brand-forest">Inspired by the decoupage technique</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;


