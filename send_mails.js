import nodemailer from 'nodemailer';
import schedule from 'node-schedule';
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

var send_to = "cherryiiit1234@gmail.com";
const mail_options = {
    from: 'pycharan01@gmail.com', // sender address
    to:send_to,
    subject: 'Our Event completed', // Subject line
    html: '<b>Hello world?</b><h2>Hello guys hooe you guys enjoyed a lot in this event and please once open our website and just checkout the new memeories and then there you will find a feed back button please click on it and then make our event succcesss with that alast step</h2>' // html body
  };

var count_of_number_of_times = 1
export function send_email(req , res){
    schedule.scheduleJob('*/10 * * * * *', () => {
        transporter.sendMail(mail_options, (error, info) => {
            if (error) {
                return console.log("bro we messed up !!\n", error);
            }
            console.log("mail sent successfully");
        });
    });
    res.send("sent the mail to the mail " , count_of_number_of_times);
    count_of_number_of_times += 1
}
