import { youtube_v3 } from 'googleapis';
import { createYoutubeInstance } from './api/youtube';
import { firestore } from './api/firebase';

let stacks: youtube_v3.Youtube[] = [];

const getStacks = () => {
  if (stacks.length) {
    return stacks;
  }

  const y1 = createYoutubeInstance(process.env.SUBSCRIBER_COUNTER_AUTH_1);
  const y2 = createYoutubeInstance(process.env.SUBSCRIBER_COUNTER_AUTH_2);
  const y3 = createYoutubeInstance(process.env.SUBSCRIBER_COUNTER_AUTH_3);

  stacks = [y1, y2, y3];
  return stacks;
};

let stackIndex = 10;

export const subscriberCounter = async (): Promise<number> => {
  const stacks = getStacks();

  if (stackIndex >= stacks.length) {
    throw new Error('index is over stacks length.');
  }

  const channelId = process.env.CHANNEL_ID;
  if (!channelId) {
    throw new Error('channel id is empty.');
  }

  const res = await stacks[stackIndex].channels.list({
    part: 'statistics',
    id: channelId,
    maxResults: 1,
    fields: 'items/statistics/subscriberCount'
  });

  // 使用するAPI-keyを変えていく
  if (stackIndex < stacks.length - 1) {
    stackIndex++;
  } else {
    // stacks の length を超えたらリセット
    stackIndex = 0;
  }

  if (!res.data.items?.length) {
    throw new Error('data is not found.');
  }

  const subscriberCount = parseInt(res.data.items[0].statistics?.subscriberCount || '0', 10);

  return subscriberCount;
};

export const updateDatabase = async (count: number) => {
  await firestore
    .collection('channels')
    .doc('statistics')
    .update({ subscriberCount: count });
};
