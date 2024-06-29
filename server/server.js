const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const userRoutes = require("./routes/userRoutes");
const furnitureRoutes = require("./routes/furnitureRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/", furnitureRoutes);
connectDB();
app.post("/payment", async (req, res) => {
  const product = await stripe.products.create({
    name: "T-shirt",
  });
  if (product) {
    var price = await stripe.prices.create({
      product: `${product.id}`,
      unit_amount: "10000",
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
        success_url: "http://localhost:3000/success",
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
