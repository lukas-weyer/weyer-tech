import AboutCard from './_components/aboutCard';
import ChatWindow from './_components/chatWindow';
import Hero from './_components/hero';
import Projects from './_components/projects';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ChatWindow />
      <AboutCard />
      <Projects />
    </main>
  );
}
