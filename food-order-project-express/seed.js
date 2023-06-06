const Product = require("./models/Product");
const sequelize = require("./db");

const createProducts = async () => {
  try {
    await sequelize.sync();

    const DUMMY_MEALS = [
      {
        name: "Sushi",
        description: "Finest fish and veggies",
        price: 22.99,
      },
      {
        name: "Schnitzel",
        description: "A german specialty!",
        price: 16.5,
      },
      {
        name: "Pizza",
        description: "Delicious Italian classic",
        price: 12.99,
      },
      {
        name: "Burger",
        description: "Juicy beef patty with all the fixings",
        price: 10.99,
      },
      {
        name: "Pad Thai",
        description: "Thai stir-fried noodles with shrimp or chicken",
        price: 14.99,
      },
      {
        name: "Steak",
        description: "Tender and succulent grilled steak",
        price: 24.99,
      },
      {
        name: "Pasta Carbonara",
        description: "Classic Italian pasta with creamy sauce",
        price: 13.99,
      },
      {
        name: "Sushi Burrito",
        description: "Sushi roll in a convenient burrito form",
        price: 9.99,
      },
      {
        name: "Chicken Tikka Masala",
        description: "Spicy Indian chicken dish in creamy tomato sauce",
        price: 15.99,
      },
      {
        name: "Fish and Chips",
        description: "British pub classic with crispy fried fish and chips",
        price: 11.99,
      },
      {
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with Caesar dressing and croutons",
        price: 8.99,
      },
    ];

    for (const meal of DUMMY_MEALS) {
      console.log(meal);
      await Product.create(meal);
    }

    console.log("Блюда успешно добавлены в базу данных.");
    process.exit(); // Завершить процесс после добавления блюд
  } catch (error) {
    console.error("Ошибка при добавлении блюд:", error);
    process.exit(1); // Завершить процесс с ошибкой
  }
};

createProducts();
