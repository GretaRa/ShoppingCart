import NavigationBar from "./Components/Navbar/NavigationBar";
import { useState } from "react";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([{ id: 1, name: "Item 1", price: 10.99 }, { id: 2, name: "Item 2", price: 5.99 }, { id: 3, name: "Item 3", price: 15.99 }]);

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleAddItem = (item) => {
    setCartItems([...cartItems, item]);
  }

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div>
      <NavigationBar
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onAddItem={handleAddItem}
        isCartOpen={isCartOpen}
        openCart={openCart}
        onClose={handleCloseCart}
      />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
