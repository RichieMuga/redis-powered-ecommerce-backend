import winston from "winston";
import dotenv from "dotenv";

import { loggerTransports } from "../helpers/logger-helpers";

dotenv.config();

const ENV = process.env.ENV || "development";

const { combine, timestamp, json, prettyPrint, errors } = winston.format;

winston.loggers.add("ServerLogger", {
  level: "debug",
  format: combine(timestamp(), json(), prettyPrint(), errors({ stack: true })),
  transports: loggerTransports("./logs/server.log"),
  defaultMeta: { service: "ServerLogger" },
});

winston.loggers.add("AppLogger", {
  level: "debug",
  format: combine(timestamp(), json(), prettyPrint(), errors({ stack: true })),
  transports: loggerTransports("./logs/app.log"),
  defaultMeta: { service: "AppLogger" },
});
