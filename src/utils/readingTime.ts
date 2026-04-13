export function getReadingTime(body?: string): number {
  const wordCount = body?.trim().split(/\s+/).length ?? 250;
  return Math.max(1, Math.ceil(wordCount / 200));
}