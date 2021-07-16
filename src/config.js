module.exports = {
    API_ENDPOINT: 'http://www.localhost:8000/api',
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    API_TOKEN: process.env.API_TOKEN,
    CLIENT_ORIGIN: "https://vercel.app"
  }