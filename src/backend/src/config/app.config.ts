const {
  NODE_ENV,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

const appConfig = {
  nodeEnv: NODE_ENV,
  db: {
    type: DB_TYPE as 'postgres' | 'sqlite' | 'mysql' | 'mariadb' | 'mssql',
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    name: DB_NAME,
  },
};

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'DB_TYPE',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is required.`);
  }

  if (
    envVar === 'DB_TYPE' &&
    !['postgres', 'sqlite', 'mysql', 'mariadb', 'mssql'].includes(
      process.env[envVar]!,
    )
  ) {
    throw new Error(`Invalid value for environment variable ${envVar}.`);
  }
});

export default appConfig;
