type TCorsAllowedOrigins = {
  [key: string]: string[];
};

const CORS_ALLOWED_ORIGINS: TCorsAllowedOrigins = {
  development: ['*'],
  production: ['https://flux-media-front.vercel.app'],
};

export { CORS_ALLOWED_ORIGINS };
