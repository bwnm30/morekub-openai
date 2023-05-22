import { createClient } from 'redis';

const redisUrl = `redis://default:7NA3pEOweEZ1CssZFRhGhF4MD48WCMZr@redis-18851.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:18851`;
const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    redisClient.set(
      'tRPC',
      'Welcome to tRPC with Next.js, Prisma and Typescript!'
    );
    console.log('🚀 Redis client connected...');
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};

connectRedis();

redisClient.on('error', (err) => console.log(err));

export default redisClient;
