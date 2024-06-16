"use client";

import {MyContext} from "./ThemeContext";
import {useState, useEffect} from 'react';

const ThemeProvider = ({children}) => {
  const [windowWidth, setWindowWidth] = useState("window.innerWidth");
  const [cartItems, setCartItems] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isLogin, setIsLogin] = useState();
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  useEffect(() => {
    // getData('http://localhost:5000/productData');
     getCartData("http://localhost:5000/cartItems");

    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);

   
      setTimeout(() => {
        setProductData(data[1]);
        setIsloading(false);
      }, 3000);


  
  }, []);

 

  const getCartData = async (url) => {
    try {
        await axios.get(url).then((response) => {
            setCartItems(response.data);
        })

    } catch (error) {
        console.log(error.message);
    }
}

  const addToCart = async (item) => {
    item.quantity = 1;

    try {
      await axios.post("http://localhost:5000/cartItems", item).then((res) => {
        if (res !== undefined) {
          setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
      })
    } catch (error) {
      console.log(error)
    }

  }




  const removeItemsFromCart = async(id) => {
    const response = await axios.delete(`http://localhost:5000/cartItems/${id}`);
    if (response !== null) {
        getCartData("http://localhost:5000/cartItems");
    }
  }

  const emptyCart = () => {
    setCartItems([])
  }


  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }


  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  }


  const openFilters=()=>{
    setIsopenFilters(!isOpenFilters)
  }

  

  const value = {
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signOut,
    signIn,
    openFilters,
    isopenNavigation,
    setIsopenNavigation,
    setCartTotalAmount,
    cartTotalAmount,
    setCartItems,
    cartItems
    
  };
  return (
    < MyContext.Provider value={{ value }}>
      {children}
    </MyContext.Provider>
  );
}

export default ThemeProvider;