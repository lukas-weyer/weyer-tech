import { notFound } from 'next/navigation';
import { getProposalByToken, getAllProposalTokens } from '@/lib/proposals';
import Proposal from './_components/proposal';

export async function generateStaticParams() {
  return getAllProposalTokens().map((token) => ({ token }));
}

export async function generateMetadata({ params }) {
  const { token } = await params;
  const proposal = getProposalByToken(token);
  if (!proposal) return {};
  return {
    title: `Wycena — ${proposal.client.name} | weyer.tech`,
    robots: { index: false, follow: false },
  };
}

export default async function ProposalPage({ params }) {
  const { token } = await params;
  const proposal = getProposalByToken(token);
  if (!proposal) notFound();
  return <Proposal data={proposal} />;
}
