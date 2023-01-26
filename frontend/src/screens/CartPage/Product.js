import React from 'react';
import { useState } from "react";
import Products from '../products.json';
import './cart.css';
export default function Product(props) {
    const {product, onAdd} = props;
    const [filterList, setFilterList] = useState(Products);
  return (
    <div>
     
        {filterList && filterList.map((item, index) => 
        
        <div key={item.id} className="card">
            <img src={item.image} alt={item.name} className="small"></img>
            <h3>{item.name}</h3>
            <div>{item.price}</div>
            <div><button onClick={onAdd}>Add to Card</button></div>

        </div>
    
    )}
    </div>
  )
}
