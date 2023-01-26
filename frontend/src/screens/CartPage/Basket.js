import React from "react";
import './cart.css';
import { Nav } from "react-bootstrap";
export default function Basket(props){
    const {cartItems, onAdd, onRemove} = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const discountPrice = itemsPrice * 0.10;
    const totalPrice = itemsPrice - discountPrice ;
  
    return(

        <aside className="block col-1" >
            <h2>Cart Items</h2>
            <div >
                {cartItems.length === 0 && <div>Cart is Empty</div>}
            </div>
         
            {cartItems.map((item) => (
                <div key={item.id} className="row">
                    <ul> {item.name} </ul>
                    <div>
                    <button onClick={()=> onAdd(item)} className="btn btn-success">+</button>
                    <button onClick={()=> onRemove(item)} className="btn btn-danger">-</button>
                    </div>
                    
                    <span><ul>{item.qty} x ${item.price.toFixed(2)}</ul></span>
                    
                   
                </div>
               
                
            ))}
         <Nav.Link href="/cart">Cart🛒</Nav.Link>
        {cartItems.length !== 0 && (
            <>
            <hr></hr>
            <div className="row">
                <div className="col-2">Price</div>
                <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
                <div className="col-2-red">Discount: - ${discountPrice.toFixed(2)}</div>
                
            </div>
            <div className="row">
                <div className="col-3">Total </div>
                <div className="col-1 text-right"> ${totalPrice.toFixed(2)}</div>
            </div>
            </>
        )}
        </aside>
    );
}