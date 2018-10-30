/**
 * Winston Documentation lives at https://www.npmjs.com/package/winston
 *
 * Import this module and use logger.info instead of console.log,
 *                            logger.warn instead of console.warn,
 *                        and logger.error instead of console.error.
 */

import { createLogger, format, transports } from 'winston';
import { Mail } from './winston-email';

const { combine, timestamp, printf } = format;

const customFormat = printf(info => {
    return `${info.level}: ${info.message}\n\n${info.meta}\n\n${info.timestamp}`
});

const transport = new Mail();

export const logger = createLogger({
    transports: [transport],
    format: combine(
        format.splat(),
        timestamp(),
        customFormat
    )
});

logger.on('error', (err) => { console.log('Logger Error:', err) });