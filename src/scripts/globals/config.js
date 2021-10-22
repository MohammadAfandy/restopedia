// console.log('env webpack', process.env.WEBPACK_MODE);

const CONFIG = {
  APP_NAME: 'Restopedia',
  API_KEY: '12345',
  BASE_URL: 'https://restaurant-api.dicoding.dev/',
  CACHE_NAME: `RESTOPEDIA-V1-${new Date().getTime()}`,
  DATABASE_NAME: 'restopedia-database',
  DATABASE_VERSION: 1,
  WEB_SOCKET_SERVER: 'wss://restopedia.mohammadafandy.com', // notification every 1 minute
};

export default CONFIG;
