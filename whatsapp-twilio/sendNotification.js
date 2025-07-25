const accountSid = 'ACb81178abcbfac6b3437405624de1be2d';
const authToken = '81c9d1e1a5a16450bdad399c0a12ba8b';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    from: 'whatsapp:+14155238886', // Twilio sandbox number
    to: 'whatsapp:+917738604742',  // Your phone number with country code
    body: 'Hello from your Angular contact form! 🚀 Thanks for reaching out.',
  })
  .then(message => console.log('Message sent with SID:', message.sid))
  .catch(err => console.error('Error:', err));
