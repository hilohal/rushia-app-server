import { youtube_v3 } from 'googleapis';

export const createYoutubeInstance = (auth?: string) => {
  if (!auth) {
    throw new Error('auth is empty');
  }

  return new youtube_v3.Youtube({
    auth
  });
};
