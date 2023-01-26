import React, { useState, useEffect } from "react";
import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProds } from "../../actions/adminActions";
import { createNoteAction } from "../../actions/notesActions";
import {createOrderAction} from "../../actions/orderAction.js";


function AdminProdAdded({ history, search }) {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );
  const prodList = useSelector((state) => state.prodList);
  const { products } = prodList;
  const onAdd = (product) => {
      
    const exist = cartItems.find(x => x.id === product.id);
    
    if(exist){
     setCartItems(cartItems.map(x => x.id === product.id ? {...exist, qty: exist.qty +1} : x ))
    }
    else{
     setCartItems([...cartItems, {...product, qty: 1}]);
    }
    dispatch(createNoteAction( product.name, product.qty, product.price, product.pic));
    dispatch(createOrderAction( product.name, product.qty, product.price, product.pic));
    alert("Item Added To Cart");
   };


useEffect(() => {
    dispatch(listProds());
  }, [
    dispatch,
    history,
  ]);

  return (
   
  <>
    
      {products &&
        products
          .map((prod) => (
            <div key={prod.id} className="block col-2"> 
            <li className="text-warning">{prod.tag}</li>
            <Link to={`/category/`+prod.id}>
              <div><img src={prod.pic} alt="product" className="small"></img></div>
              <h3>{prod.name}</h3>
              <div>${prod.price}</div>
            </Link>
            <Button onClick={()=> onAdd(prod)} className="add">Add to Card</Button>
            </div>
          ))}    

</>
  );
}

export default AdminProdAdded;
