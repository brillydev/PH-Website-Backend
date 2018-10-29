/**
 * Winston Documentation lives at https://www.npmjs.com/package/winston
 *
 * Import this module and use logger.info instead of console.log,
 *                            logger.warn instead of console.warn,
 *                        and logger.error instead of console.error.
 */

import { createLogger, format, transports } from 'winston';
import util from 'util';
import { CONFIG } from './';
import { Mail } from 'winston-mail';

const { combine, timestamp, printf } = format;

const customFormat = printf(info => {
    return `${info.level}: ${info.message}\n\n${util.inspect(info.meta)}\n\n${info.timestamp}`
});

const transport = CONFIG.NODE_ENV === 'development'
    ? new transports.Console()
    : new Mail({
        to: 'prakrit_duangsutha@outlook.com',
        from: 'pduangsu@gmail.com',
        subject: 'PH-LOG',
        host: 'smtp.gmail.com',
        username: 'brillytest@gmail.com',
        password: 'Abcdef123?',
        port: 587,
        tls: true
    });

export const logger = createLogger({
    transports: [transport],
    format: combine(
        format.splat(),
        timestamp(),
        customFormat
    )
});

logger.on('error', (err) => { console.log('Logger Error:', err) });