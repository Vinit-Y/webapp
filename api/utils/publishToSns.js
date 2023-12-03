import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

export const publishMessageToSns = async (message) => {
  AWS.config.update({ 
    region: process.env.AWS_REGION 
  });

  
  const params = {
    Message: message,
    TopicArn: process.env.AWS_SNS_TOPIC_ARN,
  };

  const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
    .publish(params)
    .promise();

  const data = await publishTextPromise;
  console.log(`Message ${params.Message} with message id ${data.MessageId} sent to the topic ${params.TopicArn}`);

};