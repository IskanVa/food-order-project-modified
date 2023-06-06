// import { useState } from "react";

// import Header from "./components/Layout/Header.jsx";
// import Meals from "./components/Meals/Meals.jsx";
// import Cart from "./components/Cart/Cart.jsx";
// import CartProvider from "./store/CartProvider.jsx";

// function App() {
//   const [cartIsShown, setCartIsShown] = useState(false);

//   const showCartHandler = () => {
//     setCartIsShown(true);
//   };

//   const hideCartHandler = () => {
//     setCartIsShown(false);
//   };

//   return (
//     <CartProvider>
//       {cartIsShown && <Cart onClose={hideCartHandler} />}
//       <Header onShowCart={showCartHandler} />
//       <main>
//         <Meals />
//       </main>
//     </CartProvider>
//   );
// }

// export default App;

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header.jsx";
import Meals from "./components/Meals/Meals.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CartProvider from "./store/CartProvider.jsx";
import Admin from "./components/Admin/Admin.jsx";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Router>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Routes>
            <Route path="/" element={<Meals />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </CartProvider>
    </Router>
  );
}

export default App;
