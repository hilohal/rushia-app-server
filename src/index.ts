import { CronJob } from 'cron';
import { subscriberCounter, updateDatabase } from './subscriber-counter';
import { data, initialize, db } from './db';
import { post } from './api/alert';

const every10secondsJobs = new CronJob('*/10 * * * * *', async () => {
  try {
    const subscriberCount = await subscriberCounter();

    if (data.subscribers !== subscriberCount) {
      data.subscribers = subscriberCount;
      db.set('subscribers', subscriberCount).write();
      await updateDatabase(subscriberCount);
    }
  } catch (err) {
    await post(err.message, err.stack);
    process.exit(1);
  }
});

const main = () => {
  initialize();
  every10secondsJobs.start();
};

main();
