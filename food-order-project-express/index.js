require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const bodyParser = require("body-parser");
const Product = require("./models/Product");
const Order = require("./models/Order");
const cors = require("cors");

const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error GET" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({
      name,
      price,
      description,
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error POST" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const orderData = req.body.items;
    const orderItems = orderData.map((item) => {
      return {
        name: item.name,
        amount: item.amount,
        price: item.price,
      };
    });

    const createdOrders = await Order.bulkCreate(orderItems);
    res.json(createdOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error POST /api/orders" });
  }
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await Order.sync();
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
