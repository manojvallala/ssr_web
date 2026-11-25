import { LangProvider } from './i18n.jsx';
import { useReveal, useVideoSpeed } from './hooks/usePageEffects.js';
import { IconSprite } from './components/Icons.jsx';
import AnnounceBar from './components/AnnounceBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Trust from './components/Trust.jsx';
import StoryIntro from './components/StoryIntro.jsx';
import Story from './components/Story.jsx';
import About from './components/About.jsx';
import RiceFinder from './components/RiceFinder.jsx';
import Varieties from './components/Varieties.jsx';
import Gallery from './components/Gallery.jsx';
import Band from './components/Band.jsx';
import OurPromise from './components/Promise.jsx';
import Faq from './components/Faq.jsx';
import Visit from './components/Visit.jsx';
import Footer from './components/Footer.jsx';
import CallDialog from './components/CallDialog.jsx';

/* The loading screen lives in index.html (it must show before this code has loaded). */
function Page() {
  useVideoSpeed();
  useReveal();
  return (
    <>
      <IconSprite />
      <AnnounceBar />
      <Header />
      <main id="top">
        <Hero />
        <Trust />
        <StoryIntro />
        <Story />
        <About />
        <RiceFinder />
        <Varieties />
        <Gallery />
        <Band />
        <OurPromise />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <CallDialog />
    </>
  );
}

export default function App() {
  return <LangProvider><Page /></LangProvider>;
}
