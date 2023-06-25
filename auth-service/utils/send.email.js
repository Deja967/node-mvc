const config = require('../config/auth.config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.SENDGRID_API_KEY);

const sendEmail = (link) => {
  const msg = {
    //When testing locally check spam in email
    to: config.VERIFIED_SENDER, // Change to your recipient
    from: config.VERIFIED_SENDER, // Change to your verified sender
    subject: 'Reset Your Password',
    html:
      '<p>We have received a request to reset your password.</p>' +
      '<p>Please click on this link within the next 10 minutes to reset your password. </p>' +
      '<a href=" ' +
      link +
      '">link</a>',
  };
  sgMail.send(msg, function (error, result) {
    if (error) {
      console.log('Email not sent error occurred : ' + error);
    } else {
      console.log('Email sent successfully');
    }
  });
};

module.exports = { sendEmail };
