import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/layout/Header/Header.js';
import WebFont from 'webfontloader';
import Footer from './components/layout/Footer/Footer.js'
import Home from './components/Home/Home.js'
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import LoginSignUp from './components/user/LoginSignUp.js';
import store from './Store.js'
import { loadUser } from './actions/userAction.js';
import UserOptions from './components/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from './components/user/Profile.js';
// import ProtectedRoute from './components/Route/ProtectedRoute.js';
import UpdateProfile from './components/user/UpdateProfile.js'
import UpdatePassword from './components/user/UpdatePassword.js'
import ForgotPassword from './components/user/ForgotPassword.js'
import ResetPassword from './components/user/ResetPassword.js'
import Cart from './components/Cart/Cart.js'
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
import Payment from './components/Cart/Payment.js'
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/Cart/orderSuccess.js'
import MyOrders from './components/Order/MyOrders.js'
import OrderDetails from './components/Order/OrderDetails.js'
import Dashboard from './components/Admin/Dashboard.js'
import ProductList from './components/Admin/ProductList.js'
import NewProduct from './components/Admin/NewProduct.js';
import UpdateProduct from './components/Admin/UpdateProduct.js'
import OrderList from './components/Admin/OrderList.js'
import UpdateOrder from './components/Admin/UpdateOrder.js'
import UsersList from './components/Admin/UsersList.js'
import UpdateUser from './components/Admin/UpdateUser.js'
import ProductReviews from './components/Admin/ProductReviews.js';
import About from './components/layout/About/About.js';
import Contact from './components/layout/Contact/Contact';

function App() {
  const {isAuthenticated, user} = useSelector((state)=>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser);

    getStripeApiKey();
  },[]);

  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route exact path='/Search' element={<Search />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />
          {isAuthenticated && <Route exact path='/account' element={<Profile />} />}
          {isAuthenticated && <Route exact path='/me/update' element={<UpdateProfile />} />}
          {isAuthenticated && <Route exact path='/password/update' element={<UpdatePassword />} />}
          {isAuthenticated && <Route exact path='/shipping' element={<Shipping />} />}
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />
          <Route exact path='/login' element={<LoginSignUp />} />
          {isAuthenticated && <Route exact path='/success' element={<OrderSuccess />} />}
          {isAuthenticated && <Route exact path='/orders' element={<MyOrders />} />}
          {isAuthenticated && <Route exact path='/order/confirm' element={<ConfirmOrder />} />}
          {isAuthenticated && <Route exact path='/order/:id' element={<OrderDetails />} />}
          {isAuthenticated && user.role==="admin" && <Route exact path='/admin/dashboard' element={<Dashboard />} />}
          {isAuthenticated && user.role==="admin" && <Route exact path='/admin/products' element={<ProductList />} />}
          {isAuthenticated && user.role==="admin" && <Route exact path='/admin/product' element={<NewProduct />} />}
          {isAuthenticated && user.role==="admin" && <Route exact path='/admin/product/:id' element={<UpdateProduct />} />}
          {isAuthenticated && user.role==="admin" && <Route exact path='/admin/orders' element={<OrderList />} />}
          {isAuthenticated && user.role==="admin" && <Route exact path='/admin/order/:id' element={<UpdateOrder />} />}
          {isAuthenticated && user.role==="admin" && <Route exact path='/admin/users' element={<UsersList />} />}
          {isAuthenticated && user.role==="admin" && <Route exact path='/admin/user/:id' element={<UpdateUser />} />}
          {isAuthenticated && user.role==="admin" && <Route exact path='/admin/reviews' element={<ProductReviews />} />}
          {/* {isAuthenticated && <Route exact path='/process/payment' element={<Payment />} />} */}
        </Routes>
        
        {stripeApiKey && 
        (<Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            {isAuthenticated && <Route exact path='/process/payment' element={<Payment />} />}
          </Routes>
        </Elements>)
        }
      <Footer/>
    </Router>
  );
}

export default App;
