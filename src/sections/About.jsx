import { Feather, Heart, Star } from 'lucide-react';

const pillars = [
  {
    icon: Feather,
    title: 'Slogan pracowni',
    copy: 'każda praca jest dziełem sztuki, tworzoną z pasją i sercem.'
  },
  {
    icon: Star,
    title: 'Oferujemy',
    copy: 'miłą atmosferę, parking za darmo, kawę, herbatę i ciastko dla każdego uczestnika.'
  },
  {
    icon: Heart,
    title: 'przysłowie',
    copy: 'Kreatywność to nie pasja, to sposób, w jaki patrzymy na świat.'
  }
];

const About = () => (
  <section id="about" className="mt-24 px-6 sm:px-10 lg:px-12">
    <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-brand-ink/10 bg-white/80 p-10 shadow-lg backdrop-blur">
      <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">O Fanana-Art</p>
          <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
            Ania – artystka z pasją, mentorka z sercem
          </h2>
          <p className="text-sm leading-relaxed text-brand-ink/75">
            Gdy pewnego razu, przechodząc przez rynek w Wiśle, Ania zatrzymała się przy stoisku z decoupage,
             stworzyła swoje pierwsze małe pudełko. Z niewielkim pakietem startowym wróciła do domu — i właśnie wtedy zaczęła się jej przygoda z tą techniką.
             Dziś, ponad piętnaście lat później, decoupage wciąż pozostaje jedną z jej ulubionych form twórczej ekspresji.
             Przeprowadziła wiele warsztatów, wspierając różne misje i inicjatywy społeczne, a każde spotkanie prowadzi z pasją, otwartością i ciepłem, które inspirują innych do odkrywania własnej kreatywności.
          </p>
          <p className="text-sm leading-relaxed text-brand-ink/75">
            Cały pomysł – warsztaty, pracownia i nazwa Fanana-Art – zrodził się z inspiracji jej męża, który zachęcił ją,
             by rozwijała się dalej w tej dziedzinie i dzieliła swoją pasję z innymi.
             Nazwa Fanana pochodzi z języka arabskiego i oznacza artystkę. Jej wybór nie jest przypadkowy – mąż Ani pochodzi z Egiptu, a sama Ania przez dziesięć lat mieszkała w tym kraju.
             To właśnie egipskie doświadczenia i połączenie dwóch kultur stały się inspiracją do stworzenia marki o arabskiej duszy i europejskiej wrażliwości.
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
              alt="Instruktorka przygotowująca materiały do warsztatów decoupage"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-forest/10" />
          </div>
          <div className="absolute -bottom-8 -left-6 rounded-3xl border border-brand-forest/20 bg-white/90 px-6 py-4 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-forest/60">Od 2010 roku</p>
            <p className="mt-1 font-display text-xl text-brand-forest">Zainspirowana techniką decoupage</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;





