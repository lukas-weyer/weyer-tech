import AboutCard from './_components/aboutCard';
import ChatWindow from './_components/chatWindow';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center md:p-12">
      <ChatWindow />
      <AboutCard />
    </main>
  );
}
