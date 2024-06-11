import winston from "winston";
import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";

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

// Middleware to log incoming requests and their duration.

app.use(morgan("[:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms"));

//Express router instance.
export const router = express.Router();

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
