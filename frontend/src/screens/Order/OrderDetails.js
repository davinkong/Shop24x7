import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import {  listNotes } from "../../actions/notesActions";


export default function OrderDetails ({ history, search }){

    const dispatch = useDispatch();
    const noteList = useSelector((state) => state.noteList);
    const {  notes } = noteList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    


    useEffect(() => {
        dispatch(listNotes());
      
    }, [
        dispatch,
        history,
        userInfo,
       
    ]);



    return(
        <MainScreen title={`Your Order has been placed!`}>
        {notes &&
            notes
            
            .map((note) => (
                <>
                <div key={note._id} className="row">
                    <ul> {note.name} </ul>
                    <span><ul>{note.qty} x ${note.price.toFixed(2)}</ul></span>
                    <span ><ul><strong className="text-danger">Discount: -${note.qty * note.price.toFixed(2) * 0.12}</strong></ul></span>
                    <span><ul><strong>${note.qty * note.price.toFixed(2) - note.price * 0.12}</strong></ul></span>

                </div>
                
                </>
                
                
            ))}
        </MainScreen>       
    )
}

