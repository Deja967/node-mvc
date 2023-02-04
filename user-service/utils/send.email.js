const config = require('../config/auth.config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);
const sendEmail = (link) => {
  const msg = {
    to: 'dejaallison@gmail.com', // Change to your recipient
    from: 'dejaallison@gmail.com', // Change to your verified sender
    subject: 'Reset Password',
    html:
      '<p>You requested for reset password, kindly use this <a href=" ' +
      link +
      '">link</a> to reset your password</p>',
  };
  sgMail.send(msg, function (error, result) {
    if (error) {
      console.log('Email not sent error occurred : ' + error);
    } else {
      console.log('Email sent successfully');
    }
  });
};

module.exports = sendEmail;
