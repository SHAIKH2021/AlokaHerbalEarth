const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace these with your values
const token = "EAAQ2kywDNEwBPNUzwKn7Khyg6S7wk8XNmAZBusOkJvHZAAr6wknRWZBe2VZCBGAQe6y5HbWkHkf3518DH6Qhr5yGcD4H2hMgbaPGMSMmExBbNZAtFR8p0WmqnMU7G5jATlq08dpEgj4cSGZApHHetAZCeuJIDUQuBY9kZAkclPGG6g14ngW4j2KQWVaVqcZAfo17HZAKWY841ICIOsoIKlgbapw9p8hM4DGZBSinCJdWrPcgAgD"; // The long token you copied
const phoneNumberId = "1092643836296026"; // The Phone Number ID you confirmed

app.post("/send-whatsapp", async (req, res) => {
  try {
    const { phone, name, type, userInfo } = req.body;

    // Build message
    const messageBody =
      type === "buy"
        ? `Hi ${name}\nThanks for choosing Aloka Herbal Earth for your health\nYour order details are as:\nQuantity: ${userInfo.quantity} / ${userInfo.size}\nTotal price: ${userInfo.totalPrice}/-\nAddress: ${userInfo.address}\nWe'll shortly connect with you\nNote: For any query, message here`
        : `Hi ${name}, Thanks for reaching out! We’ve received your feedback.`;

    // Send message via WhatsApp Cloud API
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: `91${phone}`,
        type: "text",
        text: { body: messageBody },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
