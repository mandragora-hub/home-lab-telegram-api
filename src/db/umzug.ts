import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `${__dirname}/../../data/database.sqlite`,
  logging: console.log, // default logging
  define: {
    timestamps: true,
  },
});

export const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
