const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("web/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "web", "build", "index.html"));
  });
}

app.post("/payment", cors(), async (req, res) => {
  let { amount, id, email } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "AUD",
      receipt_email: email,
      description: "Coach Proph",
      payment_method: id,
      confirm: true,
    });

    console.log("Payment: ", payment);
    res.json({
      message: "Payment successful.",
      success: true,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.json({
      message: "Payment failed.",
      success: false,
    });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server listening on port 4000");
});
