import axios from 'axios';

const createMessage = (message: string, stack?: string) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '<!channel> *An error has occurred*'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\`${message}\``
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\`\`\`${stack}\`\`\``
        }
      }
    ]
  };
};

export const post = async (message: string, stack?: string) => {
  if (!process.env.SLACK_ALERT_WEBHOOK) {
    throw new Error('SLACK_ALERT_WEBHOOK is empty');
  }

  await axios.post(process.env.SLACK_ALERT_WEBHOOK, createMessage(message, stack));
};
