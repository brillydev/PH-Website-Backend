const nodemailer = require('nodemailer');
const Transport = require('winston-transport');
const util = require('util');

export class Mail extends Transport {
    constructor(options) {
        super(options);

        this.mail = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'brillytest@gmail.com',
                pass: 'Abcdef123?'
            }
        });
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        this.mail.sendMail({
            from: 'brillytest@gmail.com',
            to: 'prakrit_duangsutha@outlook.com',
            subject: 'PH-LOG',
            text: JSON.stringify(info)
        },
            (err, info) => { console.log(err, info) });
    };

    callback();
};