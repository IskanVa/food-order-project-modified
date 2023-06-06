import React, { useState } from "react";
import axios from "axios";
import classes from "./Admin.module.css";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Отправка данных продукта на сервер
      const response = await axios.post("/api/products", product);
      console.log(response.data);

      // Сброс формы
      setProduct({
        name: "",
        price: "",
        description: "",
      });
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
    }
  };

  return (
    <div className={classes.admin}>
      <h2>Админская страница</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formControl}>
          <label htmlFor="name">Название продукта:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="price">Цена продукта:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="description">Описание продукта:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <button className={classes.submitButton} type="submit">
          Добавить продукт
        </button>
      </form>
    </div>
  );
}

export default Admin;
