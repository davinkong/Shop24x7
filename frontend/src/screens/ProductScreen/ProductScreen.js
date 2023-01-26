import React, {  useState } from "react";
import Products from '../products.json';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Basket from "../CartPage/Basket";
import { useDispatch } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import {createOrderAction} from "../../actions/orderAction.js";
import AdminProdAdded from "../MyNotes/AdminProdAdded";
import "../CartPage/cart.css";

function ProductScreen({ match, history, search }) {
 
  const dispatch = useDispatch();
  const [filterList] = useState(Products);

    const [cartItems, setCartItems] = useState([]);
    


    //Add to cart
    const onAdd = (product) => {
      
      const exist = cartItems.find(x => x.id === product.id);
      
      if(exist){
       setCartItems(cartItems.map(x => x.id === product.id ? {...exist, qty: exist.qty +1} : x ))
      }
      else{
       setCartItems([...cartItems, {...product, qty: 1}]);
      }
      dispatch(createNoteAction( product.name, product.qty, product.price));
      dispatch(createOrderAction( product.name, product.qty, product.price));
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



    


  return (
    <>
    <span><Basket onAdd={onAdd} onRemove={onRemove} cartItems={cartItems}></Basket></span>

    {filterList && filterList.map((item, index) => 
        
      <div key={item.id} className="block col-2" > 
        <Link to={`/product/`+item.id}>
          <div><img src={item.image} alt="product" className="small"></img></div>
          <h3>{item.name}</h3>
          <div>${item.price}</div>
        </Link>
        <Button onClick={()=> onAdd(item)} className="add" >Add to Card</Button>
      </div>
         

  )}
        <AdminProdAdded></AdminProdAdded>

   </>
  );
}

export default ProductScreen;
