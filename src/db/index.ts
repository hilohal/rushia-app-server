import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('data/db.json');
export const db = low(adapter);

export type Data = {
  subscribers: number;
};

export let data: Data = {
  subscribers: 0
};

export const initialize = () => {
  db.defaults<Data>({
    subscribers: 0
  }).write();

  const subscribers = db.get('subscribers').value();
  data.subscribers = subscribers;
};
