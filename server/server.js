const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const userRoutes = require("./routes/userRoutes");
const furnitureRoutes = require("./routes/furnitureRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/payment", paymentRoutes);
app.use("/furniture", furnitureRoutes);
connectDB();
app.post("/payment", async (req, res) => {
  const { amount, name } = req.body;
  const product = await stripe.products.create({
    name: name,
  });
  if (product) {
    var price = await stripe.prices.create({
      product: `${product.id}`,
      unit_amount: amount,
      currency: "inr",
    });
    if (price.id) {
      var session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: `${price.id}`,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url:
          "http://localhost:3000/user?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/error",
        customer_email: "demo@gmail.com",
      });
    }
    res.json(session);
  }
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
