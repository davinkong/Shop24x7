import React, {  useState } from "react";
import Products from '../products.json';
import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import {createOrderAction} from "../../actions/orderAction.js";

import Basket from "./Basket";
import "../CartPage/cart.css";
import AdminProdAdded from "../MyNotes/AdminProdAdded";

function CartPage(props) {
   
    const dispatch = useDispatch();
    const [filterList, setFilterList] = useState(Products);

    const [cartItems, setCartItems] = useState([]);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
   
  //add items to cart
  const onAdd = (product) => {
      
    const exist = cartItems.find(x => x.id === product.id);
    
    if(exist){
     setCartItems(cartItems.map(x => x.id === product.id ? {...exist, qty: exist.qty +1} : x ))
    }
    else{
     setCartItems([...cartItems, {...product, qty: 1}]);
    }
    dispatch(createNoteAction( product.name, product.qty, product.price));
    dispatch(createOrderAction( product.name, product.qty, product.price, userInfo.email));
    alert("Item Added To Cart");
   };

   //Remove item from cart
   const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }else{
      setCartItems(
        cartItems.map((x) => 
         x.id === product.id ? {...exist, qty: exist.qty - 1} : x)
      );
        
    }
  
   }
  
  //Setup filtering and sorting option
  const handleAscPrice = (event) => {
   
    const priceAsc = [...filterList].sort(
        (a,b) => a.price > b.price ? 1 : -1 )
                
    setFilterList(priceAsc);
  }

  const handleDscPrice = (event) => {
    const priceDsc = [...filterList].sort(
        (a,b) => a.price > b.price ? -1 : 1 )
              
  setFilterList(priceDsc);
  }

  const lessThanFifty = (event) => {
    const underFifty =  Products.filter(
          (a, b) =>
          a.price <= 50 ? a.price : b.price
        )
      setFilterList(underFifty);
  }
  const lessThanTwoHundred = (event) => {
    const underTwo =  Products.filter(
          (a, b) =>
          a.price > 50 && a.price <= 200 ? a.price : b.price
        )
      setFilterList(underTwo);
  }
  const lessThanFiveHundred = (event) => {
    const underFive =  Products.filter(
          (a, b) =>
          a.price > 200 && a.price <= 500 ? a.price : b.price
        )
      setFilterList(underFive);
  }
  const lessThanOneK = (event) => {
    const underOneK =  Products.filter(
          (a, b) =>
          a.price > 500 && a.price <= 1000 ? a.price : b.price
        )
      setFilterList(underOneK);
  }
  const lessThanFifteen = (event) => {
    const underfifteen =  Products.filter(
          (a, b) =>
          a.price > 1000 && a.price <= 1500 ? a.price : b.price
        )
      setFilterList(underfifteen);
  }

const handleSearch = (event) => {
    if (event.target.value === "") {
      setFilterList(Products);
      return;
    }
    const filteredValues = Products.filter(
      (item) =>
        item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 ||
        item.price.toString().indexOf(event.target.value.toLowerCase()) !== -1 

    );
    setFilterList(filteredValues);
  };
 
    return (
        <>
      <div>
        <Button onClick={handleAscPrice} id="asc" className="btn btn-dark">Price ↓</Button>
        <Button onClick={handleDscPrice} id="dsc" className="btn btn-dark">Price ↑</Button>
        <input name="query" type="text" placeholder="Search filtering" onChange={handleSearch} />
      </div>
      <br></br>
      <div>
        <p><strong>Price Range: </strong></p>
        <button onClick={lessThanFifty} id="fifty" >Under $50</button>
        <br></br>
        <button onClick={lessThanTwoHundred} id="twoHundred" >$50 - $200</button>
        <br></br>
        <button onClick={lessThanFiveHundred} id="fiveHundred" >$200 - $500</button>
        <br></br>
        <button onClick={lessThanOneK} id="oneK" >$500 - $1000</button>
        <br></br>
        <button onClick={lessThanFifteen} id="fifteen" >$1000 - $1500</button>
      </div>
        
      
      <span><Basket onAdd={onAdd} onRemove={onRemove} cartItems={cartItems}></Basket></span>
      
    {filterList && filterList.map((item, index) => 
        <div key={item.id} className="block col-2"> 
        <li className="text-warning">{item.tag}</li>
        <Link to={`/category/`+item.id}>
          <div><img src={item.image} alt="product" className="small"></img></div>
          <h3>{item.name}</h3>
          <div>${item.price}</div>
        </Link>
        <Button onClick={()=> onAdd(item)} className="add">Add to Card</Button>
      </div>
      
      
    )}

      <AdminProdAdded></AdminProdAdded>

   

     </>
    );
}

export default CartPage;


