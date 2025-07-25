const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const accountSid = "ACb81178abcbfac6b3437405624de1be2d";
const authToken = "81c9d1e1a5a16450bdad399c0a12ba8b";
const client = twilio(accountSid, authToken);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-whatsapp", async (req, res) => {
  try {
    const { phone, name, type, userInfo } = req.body;

    const message = await client.messages.create({
      from: "whatsapp:+917738604742", // Twilio Sandbox number
      to: `whatsapp:+91${phone}`, // Ensure phone is just 10 digits
      body:
        type == "buy"
          ? `Hi ${name}\nThanks for choosing Aloka Herbal Earth for your health\nYour order details are as:\nQuantity: ${userInfo.quantity} / ${userInfo.size}l\nTotal price: ${userInfo.totalPrice}/-\nAddress: ${userInfo.address}\nWe'll shortly connect with you\nNote: For any query, message here`
          : `Hi ${name}, Thanks for reaching out! We’ve received your feedback.`,
    });

    res.json({ success: true, sid: message.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
