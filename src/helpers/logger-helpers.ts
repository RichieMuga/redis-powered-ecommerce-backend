import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";

export function loggerTransports(logger_file: string = "") {
  const transports = [];

  if (NODE_ENV === "development") {
    transports.push(new winston.transports.Console());
    transports.push(new winston.transports.File({ filename: logger_file }));
  } else {
    transports.push(new winston.transports.File({ filename: logger_file }));
  }

  return transports;
}
