const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.sendgridAPI);

const sendEmail = (code, toEmail) => {


    const msg = {
        to: `${toEmail}`,
        from: `${process.env.fromEmail}`,
        subject: 'Verification Code',
        text: `Your verification code is ${code}`,
        html: `<h1>Your verification code is ${code} </h1>`,
      };

    sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);
 
    if (error.response) {
      console.error(error.response.body)
    }
  });
}

module.exports = sendEmail;