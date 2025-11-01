import { useRef, useState } from 'react';
import Hero from './sections/Hero.jsx';
import Announcements from './sections/Announcements.jsx';
import Workshops from './sections/Workshops.jsx';
import Gallery from './sections/Gallery.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import TopNav from './components/TopNav.jsx';
import SpecialGatherings from './sections/SpecialGatherings.jsx';
import { announcements } from './data/announcements.js';
import { workshops } from './data/workshops.js';

const App = () => {
  const contactRef = useRef(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const handleInterested = (workshop) => {
    setSelectedWorkshop(workshop);
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleHeroCta = () => {
    document.getElementById('workshops')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-brand-cream pattern-overlay">
      <TopNav />
      <Hero onCtaClick={handleHeroCta} />
      <Announcements data={announcements} />
      <SpecialGatherings />
      <Workshops onInterested={handleInterested} />
      <About />
      <Gallery />
      <Contact ref={contactRef} workshops={workshops} selectedWorkshop={selectedWorkshop} />
      <Footer />
    </div>
  );
};

export default App;
