module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'portal'),
      user: env('DATABASE_USERNAME', 'portal'),
      password: env('DATABASE_PASSWORD', 'portal'),
      ssl: env.bool('DATABASE_SSL', false),
      socketPath: env('INSTANCE_CONNECTION_NAME', '')
    },
  },
});
