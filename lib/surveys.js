import fs from 'fs';
import path from 'path';

export function getAllSurveys() {
  const dir = path.join(process.cwd(), 'surveys');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  return files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'))
  );
}

export function getSurveyByToken(token) {
  const surveys = getAllSurveys();
  return surveys.find((s) => s.token === token) || null;
}

export function getAllTokens() {
  return getAllSurveys().map((s) => s.token);
}
