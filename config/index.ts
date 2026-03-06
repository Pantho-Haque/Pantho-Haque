const ENABLE_SENTRY = process.env.NEXT_ENABLE_SENTRY === 'true';

const config =  {
  api: {
    host: process.env.NEXT_API_BASE_URL,
    clientSecret: process.env.NEXT_API_CLIENT_SECRET,
  }
};

export default config;