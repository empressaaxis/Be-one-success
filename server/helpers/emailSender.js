import sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';
dotenv.config();

export const sendEmail = (toEmail, subject, text, html) => {
    sgMail.setApiKey(process.env.SENDGRID_API);
    const emailMsg = {
        to: toEmail,
        from: 'richcyuzuzo1@gmail.com',
        subject,
        text,
        html
    };

    sgMail
        .send(emailMsg)
        .then(() => console.log('Email Sent'))
        .catch((err) => console.log(err))
}
