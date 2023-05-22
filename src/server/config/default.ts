const customConfig: {
  port: number;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  origin: string;
  dbUri: string;
  accessTokenPrivateKey: string;
  refreshTokenPrivateKey: string;
  accessTokenPublicKey: string;
  refreshTokenPublicKey: string;
  redisCacheExpiresIn: number;
  channelAccessToken:string;
  channelSecret:string;
  openAIApiKey:string;
  superbaseUrl:string;
  superbaseKey:string;
} = {
  port: 8000,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  origin: 'http://localhost:3000',
  redisCacheExpiresIn: 60,

  dbUri: process.env.DATABASE_URL as string,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
  channelAccessToken:process.env.CHANNEL_ACCESS_TOKEN as string,
  channelSecret:process.env.CHANNEL_SECRET as string,
  openAIApiKey:process.env.OPEN_API_KEY as string,
  superbaseUrl:process.env.SUPABASE_URL as string,
  superbaseKey:process.env.SUPABASE_KEY as string
};

export default customConfig;
