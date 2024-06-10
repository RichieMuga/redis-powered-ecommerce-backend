import winston from "winston";
import dotenv from "dotenv";
import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
// import expressWinston from "express-winston";

import "../loggers/base-logger";

// Load environment variables from .env file
dotenv.config();

// Get references to logger instances
const serverLogger = winston.loggers.get("ServerLogger");
// const appLogger = winston.loggers.get("AppLogger");

// Express application instance.
export const app: Express = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use(morgan("[:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"));

// Middleware to log incoming requests and their duration.
// app.use(
//   expressWinston.logger({
//     transports: [new winston.transports.Console()],
//     format: winston.format.combine(winston.format.colorize(), winston.format.json(), winston.format.prettyPrint()),
//   })
// );

// Middleware function to log incoming requests and their duration.
// app.use((req, res, next) => {
//   const profiler = appLogger.startTimer();

//   res.on("finish", () => {
//     profiler.done({ message: `${req.method} ${req.url}` });
//   });

//   next();
// });

//Express router instance.
export const router = express.Router();

// Prisma client instance for interacting with the database.
export const prisma = new PrismaClient();

/**
 * Function to start the server listener on the specified port.
 * @param {string | number} port - The port number to listen on.
 * @returns {void}
 */
export function serverListener(port: string | number = process.env.PORT || 3000) {
  try {
    app.listen(port, () => {
      // serverLogger.info(`[server]: Server is running at http://localhost:${port}`);
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error: any) {
    serverLogger.error(error, new Error(error));
  }
}
