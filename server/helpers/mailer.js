const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    family: 4
});

const sendMail = async(email,subject,content) => {
    try{
        var mailOptions={
            from:process.env.SMTP_MAIL,
            to:email,
            subject:subject,
            html:content
        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.error('Error occurred while sending mail:', error);
                return;
            }
            if (info) {
                console.log('Mail sent successfully', info.messageId);
            }
            
        });

    }catch(error){
        console.error('Unexpected error in sendMail function:', error);

    }
};

module.exports = { sendMail };
