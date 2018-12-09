const path = require("path");

const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

module.exports = {
  url: username
    ? `mongodb://${username}:${password}@${host}/${database}`
    : `mongodb://${host}/${database}`,

  modelsPath: path.resolve("app", "models")
};
