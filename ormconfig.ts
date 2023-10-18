module.exports = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: ["src/database/entities/*.ts"],
    migrations: ["src/database/migration/*.ts"],
    subscribers: ["src/database/subscriber/*.ts"],
    cli: {
      entitiesDir: "src/database/entities",
      migrationsDir: "src/database/migration",
      subscribersDir: "src/database/subscriber",
    },
  };
  