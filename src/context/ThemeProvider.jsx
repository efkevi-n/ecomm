"use client";

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MyContext = createContext();

const ThemeProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cartItems, setCartItems] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState();
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  useEffect(() => {
    getCartData('http://localhost:5000/cartItems');

    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);

    setTimeout(() => {
      // Assuming 'data' is defined somewhere; if not, you should fetch it.
      setProductData(data[1]);
      setIsLoading(false);
    }, 3000);
  }, []);

  const getCartData = async (url) => {
    try {
      const response = await axios.get(url);
      setCartItems(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const addToCart = async (item) => {
    item.quantity = 1;

    try {
      const res = await axios.post("http://localhost:5000/cartItems", item);
      if (res) {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const removeItemsFromCart = async (id) => {
    const response = await axios.delete(`http://localhost:5000/cartItems/${id}`);
    if (response) {
      getCartData("http://localhost:5000/cartItems");
    }
  }

  const emptyCart = () => {
    setCartItems([]);
  }

  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }

  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  }

  const openFilters = () => {
    setIsOpenFilter(!isOpenFilter);
  }

  const value = {
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilter,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signOut,
    signIn,
    openFilters,
    isOpenNavigation,
    setIsOpenNavigation,
    setCartTotalAmount,
    cartTotalAmount,
    setCartItems,
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

export default ThemeProvider;
