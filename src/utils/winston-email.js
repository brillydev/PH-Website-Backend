import * as nodemailer from 'nodemailer';
import * as Transport from 'winston-transport';
import CONFIG from '../config';

export class Mail extends Transport {
    constructor(options) {
        super(options);

        this.mail = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 465,
            secure: true,
            auth: {
                user: 'apikey',
                pass: CONFIG.SENDGRID_KEY
            }
        });
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        this.send(info);
        callback();
    };

    send(info) {
        this.mail.sendMail({
            from: 'brillytest@gmail.com',
            to: 'prakrit_duangsutha@outlook.com',
            subject: 'PH-LOG',
            text: JSON.stringify(info, null, '\t')
        },
            (err, info) => {
                console.log(err, info)
            }
        );
    }

};