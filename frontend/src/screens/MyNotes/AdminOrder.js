import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import {listOrders} from "../../actions/orderAction";
import { Button } from "react-bootstrap";
import { deleteNoteAction } from "../../actions/notesActions";
import { deleteOrderAction, updateOrderAction } from "../../actions/orderAction";

export default function AdminOrder ({ history, search,match }){

    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.orderList);
    const {  notes } = orderList;
    const [isDelivered, setIsDelivered] = useState();

    console.log(notes);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    


    useEffect(() => {
        dispatch(listOrders());
        if (!userInfo.isAdmin) {
            history.push("/");
            alert("No Authorization, Admin Only")
          }
    }, [
        dispatch,
        history,
        userInfo,
       
    ]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
        dispatch(deleteNoteAction(id));
        dispatch(deleteOrderAction(id));
        }
    };
    const updateHandler = (e) => {
        setIsDelivered({isDelivered : true})
        dispatch(updateOrderAction(match.params.id, isDelivered));
     
      };
    
    return(
        <MainScreen title={`Admin Manage Orders`}>
        {notes && notes.map((note) => (
                <>
                <div key={note._id} className="row">
                <ul>  {note._id} </ul>
                
                <ul>{note.email}</ul>
                <ul><Button  onClick={updateHandler}>Process</Button>
                    <Button
                        variant="danger"
                            className="mx-2"
                            onClick={() => deleteHandler(note._id)}
                            >Delete
                    </Button>
                </ul>
                
                </div>
                
                </>
                
                
            ))}
                
   
                
          
     </MainScreen>       
    )
}
