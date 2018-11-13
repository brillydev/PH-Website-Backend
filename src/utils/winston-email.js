import * as nodemailer from "nodemailer";
import * as Transport from "winston-transport";
import CONFIG from "../config";

export class Mail extends Transport {
  constructor(options) {
    super(options);

    this.mail = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true,
      auth: {
        user: "apikey",
        pass: CONFIG.SENDGRID_KEY
      }
    });
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    this.send(info);
    callback();
  }

  // TODO: change email to send log to
  send(info) {
    this.mail.sendMail(
      {
        from: "reports@purduehackers.com",
        to: "destination@email.com",
        subject: `[PH-LOG] [${info.level.toUpperCase()}] ${info.message}`,
        text: JSON.stringify(info, null, 2)
      },
      (err, info) => {
        // uncomment for log about email log report
        // console.log(err, info);
      }
    );
  }
}
