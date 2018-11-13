/**
 * Winston Documentation lives at https://www.npmjs.com/package/winston
 *
 * Import this module and use logger.info instead of console.log,
 *                            logger.warn instead of console.warn,
 *                        and logger.error instead of console.error.
 */

import { createLogger, format, transports } from "winston";
import { Mail } from "./winston-email";
import CONFIG from "../config";
import * as strip from "strip-ansi";
let util = require("util");

const { combine, timestamp, printf, colorize } = format;

const customConsoleFormat = printf(
  // eslint-disable-next-line prettier/prettier
  info =>
    `${info.level}: ${info.message}\n\n${util.inspect(info.meta)}\n\n${
      info.timestamp
    }\n`
);

const customMailFormat = printf(
  // eslint-disable-next-line prettier/prettier
  info =>
    `${info.level}: ${info.message}\n\n${JSON.stringify(
      info.meta,
      null,
      2
    )}\n\n${info.timestamp}\n`
);

const transport = [
  new transports.Console({
    format: combine(
      format(info => {
        info.level = info.level.toUpperCase();
        return info;
      })(),
      colorize(),
      format.splat(),
      timestamp(),
      customConsoleFormat
    )
  })
];

if (CONFIG.NODE_ENV === "production")
  transport.push(
    new Mail({ format: combine(format.splat(), timestamp(), customMailFormat) })
  );

export const logger = createLogger({
  transports: transport,
  silent: CONFIG.NODE_ENV === "test"
});

logger.on("error", err => {
  console.log("Logger Error:", err);
});
