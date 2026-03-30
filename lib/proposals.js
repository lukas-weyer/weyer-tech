import fs from 'fs';
import path from 'path';

export function getAllProposals() {
  const dir = path.join(process.cwd(), 'proposals');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  return files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'))
  );
}

export function getProposalByToken(token) {
  const proposals = getAllProposals();
  return proposals.find((p) => p.token === token) || null;
}

export function getAllProposalTokens() {
  return getAllProposals().map((p) => p.token);
}
