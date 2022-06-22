// eslint-disable-next-line no-undef
const REDIRECT_URL = '';
// eslint-disable-next-line no-undef
const BASE_URL = 'http://192.168.1.4:8000';
const API_URL      = 'http://192.168.1.4:8000/api';
// eslint-disable-next-line no-undef
const AUTH_URL     = 'http://192.168.1.4:8000/api/login';

const EN_LOCALE_ONLY = process.env.EN_LOCALE_ONLY === 'true';
const IN_BROWSER = typeof window !== 'undefined';
const IS_DEBUG = process.env.DEBUG === 'true';
const IS_PROD = process.env.NODE_ENV === 'production';

export {
  REDIRECT_URL,
  API_URL,
  AUTH_URL,
  BASE_URL,
  EN_LOCALE_ONLY,
  IN_BROWSER,
  IS_DEBUG,
  IS_PROD,
};
