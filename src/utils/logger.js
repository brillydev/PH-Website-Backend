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
import * as colorJSON from "json-colorizer";

const { combine, timestamp, printf, colorize } = format;

const customConsoleFormat = printf(
  // eslint-disable-next-line prettier/prettier
  info =>
    `[${info.level}]: [${info.timestamp}]\n\n${info.message} ${colorJSON(
      JSON.stringify(info.meta, null, 2)
    )}\n\n`
);

const customMailFormat = printf(
  // eslint-disable-next-line prettier/prettier
  info =>
    `[${info.level}]: [${info.timestamp}]\n\n${info.message} ${JSON.stringify(
      info.meta,
      null,
      2
    )}\n\n`
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
