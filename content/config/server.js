module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 80),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env("PUBLIC_URL", "http://localhost:1337")
});
