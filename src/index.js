import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router";
import { Route } from 'react-router';
import { Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';


import Category from './components/CategoryPage/Category';
import ProductList from './components/ProductDetailsPage/ProductList';
import Login from './components/LogIng&SignUP/LogIn';
import SignupForm from './components/LogIng&SignUP/SignUp';
import AddProduct from './components/admin/admin';
import Search from './components/SearchPage/Search';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<App />} />
      <Route path="/category" element={<Category />} />
      <Route path='/productList/:id' element={<ProductList/>}/>
      <Route path='/productList' element={<ProductList/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignupForm/>}/>
      <Route path='/admin' element={<AddProduct/>}/>
      <Route path='/search/:id' element={<Search/>}/>
      <Route path='/search' element={<Search/>}/>
           
    </Routes>
  </BrowserRouter>
);


reportWebVitals();
