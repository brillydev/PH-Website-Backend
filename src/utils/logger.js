/**
 * Winston Documentation lives at https://www.npmjs.com/package/winston
 *
 * Import this module and use logger.info instead of console.log,
 *                            logger.warn instead of console.warn,
 *                        and logger.error instead of console.error.
 */

import { createLogger, format, transports } from 'winston';
import { Mail } from './winston-email';
import util from 'util';

const { combine, timestamp, printf } = format;

const customFormat = printf(info => {
    return `${info.level}: ${info.message}\n\n${JSON.stringify(info.meta)}\n\n${info.timestamp}`
});

// FIXME: Configure transport options for backend
// const transport = new Mail();
const transport = new transports.Console();

export const logger = createLogger({
    transports: [transport],
    format: combine(
        format.splat(),
        timestamp(),
        customFormat
    )
});

logger.on('error', (err) => { console.log('Logger Error:', err) });