import { Feather, Heart, Star } from 'lucide-react';

const About = () => (
  <section id="about" className="mt-24 px-6 sm:px-10 lg:px-12">
    <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-brand-ink/10 bg-white/80 p-10 shadow-lg backdrop-blur">
      <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">About Fanana-Art</p>
          <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
            Guided by Fananah — Artist, mentor, storyteller
          </h2>
          <p className="text-sm leading-relaxed text-brand-ink/75">
            Inspired by the rich traditions of decoupage and Middle Eastern craft, Fananah founded
            Fanana-Art to nurture creativity within community. With over a decade of teaching experience,
            she blends detailed instruction with a gentle, encouraging approach. Sessions are intentionally
            intimate to give each participant space to explore, experiment, and finish pieces they are proud
            to display.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Feather,
                title: 'Thoughtful techniques',
                copy: 'Build foundational layers, distress finishes, and add bespoke details.'
              },
              {
                icon: Star,
                title: 'Curated materials',
                copy: 'Premium European papers, handcrafted stencils, and artist-grade mediums.'
              },
              {
                icon: Heart,
                title: 'Community focused',
                copy: 'Work in a warm studio environment that celebrates shared creativity.'
              }
            ].map((item) => (
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
              src="https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=60"
              alt="Instructor arranging decoupage workshop materials"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-forest/10" />
          </div>
          <div className="absolute -bottom-8 -left-6 rounded-3xl border border-brand-forest/20 bg-white/90 px-6 py-4 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-forest/60">Since 2014</p>
            <p className="mt-1 font-display text-xl text-brand-forest">3200+ creative sessions</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
