import { existsSync } from 'fs';
import { basename, dirname, join } from 'path';

export function findMatchingSrtFile(srtPath: string): string | null {
  const directory = dirname(srtPath);
  const srtBaseName = basename(srtPath, '.srt');

  // Progressive tag removal - split by dots and try removing one segment at a time
  const segments = srtBaseName.split('.');
  while (segments.length > 1) {
    segments.pop(); // Remove the last segment
    const baseNameToTry = segments.join('.');

    const possibleSrtPath = join(directory, `${baseNameToTry}.en.srt`);
    if (existsSync(possibleSrtPath)) {
      return possibleSrtPath;
    }
    const altPossibleSrtPath = join(directory, `${baseNameToTry}.en.hi.srt`);
    if (existsSync(altPossibleSrtPath)) {
      return altPossibleSrtPath;
    }
  }

  return null;
}