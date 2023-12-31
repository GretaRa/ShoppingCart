import NavigationBar from "./Components/Navbar/NavigationBar";
import { useState, createContext } from "react";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import fetchData from "./Components/API/Api";
import { useEffect } from "react";

export const ShopContext = createContext({
  products: [],
  cartItems: [],
  addToCart: () => {},
  openCart: () => {},
  handleCloseCart: () => {},
  handleRemoveItem: () => {},
  handleAddItem: () => {},
  isCartOpen: false,
  closeCart: () => {},
  loading: false,
  error: null,
  selectedCategory: null,
  handleCategoryChange: () => {},
  setSelectedCategory: () => {}
});

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleAddItem = (item) => {
    setCartItems([...cartItems,  item ]);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const [products, setProducts] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category);

  const productUrl = selectedCategory
    ? `https://fakestoreapi.com/products/category/${selectedCategory}`
    : "https://fakestoreapi.com/products";

    useEffect(() => {
      setLoading(true);
      setError(null);
    
      fetchData(productUrl)
        .then((response) => {
          console.log('API Response:', response); // Check the API response
    
          setProducts((prevProducts) => {
            // Assuming response is an array of products
            const updatedProducts = [...prevProducts, ...response]; // Merge the previous state with new data
            console.log('Updated Products:', updatedProducts); // Check the updated state
            return updatedProducts;
          });
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => setLoading(false));
    }, [productUrl]);
    

  return (
    <ShopContext.Provider value={{category, products, cartItems, handleOpenCart, handleCloseCart, handleAddItem, handleRemoveItem, isCartOpen, error, loading, setSelectedCategory}}>
    <div>
      <NavigationBar/>
      <Outlet />
      <Footer />
    </div>
    </ShopContext.Provider>
  );
}
