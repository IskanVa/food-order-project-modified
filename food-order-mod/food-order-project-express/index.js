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
      name: "test",
      price: 666,
      description: "test",
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error POST" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const orderData = req.body;
    const filterData = orderData.map((item) => {
      const { id, ...rest } = item;
      return rest;
    });

    const createdOrder = await Order.create(...filterData);
    res.json(createdOrder);
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
