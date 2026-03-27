import { notFound } from 'next/navigation';
import { getSurveyByToken, getAllTokens } from '@/lib/surveys';
import Survey from './_components/survey';

export async function generateStaticParams() {
  const tokens = getAllTokens();
  return tokens.map((token) => ({ token }));
}

export async function generateMetadata({ params }) {
  const { token } = await params;
  const survey = getSurveyByToken(token);
  if (!survey) return {};
  return {
    title: `Discovery — ${survey.client.name} | weyer.tech`,
    robots: { index: false, follow: false },
  };
}

export default async function DiscoveryPage({ params }) {
  const { token } = await params;
  const survey = getSurveyByToken(token);
  if (!survey) notFound();

  return <Survey config={survey} />;
}
