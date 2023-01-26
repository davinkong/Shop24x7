import React, { useEffect} from "react";
import { Button, Nav } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import { deleteOrderAction } from "../../actions/orderAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";




export default function MainCart({history}) {
   
    const dispatch = useDispatch();
   


    const noteList = useSelector((state) => state.noteList);
    const { loading, error, notes } = noteList;
    const grandTotal = notes?.reduce((total, item) => {
        return total+(item.price*item.qty-(item.price*0.10));
      }, 0);
    
    console.log(notes);
 
   


    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const noteDelete = useSelector((state) => state.noteDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = noteDelete;

   

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;
    

   
    
   
    useEffect(() => {
        dispatch(listNotes());
        if (!userInfo) {
        history.push("/login");
        alert("Please Login or Register")
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successUpdate,
        
    ]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
        dispatch(deleteNoteAction(id));
        dispatch(deleteOrderAction(id));
        }
    };
    
    
  
   
    
    return (
    <>
        <MainScreen title={`Great Pick ${userInfo && userInfo.first_name}!`}>
            <h1>Cart</h1>
      
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loading && <Loading />}
        {loadingDelete && <Loading />}

        {notes && notes.map((note, index) => (
                <>
                <div key={note._id} className="row">
                    <ul> {note.name} </ul>
  
                    <span><ul>{note.qty} x ${note.price.toFixed(2)}</ul></span>
                    <span ><ul><strong className="text-danger">Discount: -${note.qty * note.price.toFixed(2) * 0.12}</strong></ul></span>
                    <span><ul><strong>${note.qty * note.price.toFixed(2) - note.price * 0.12}</strong></ul></span>
                    
                    <span>
                    <ul>

                    <Button href={`/carts/${note._id}`}>Edit Qty</Button>
                    <Button
                        variant="danger"
                            className="mx-2"
                            onClick={() => deleteHandler(note._id)}
                            >Delete</Button>
                    </ul>
                    </span>

                </div>

                
                </>
                
                
            ))}
            
            <hr></hr>

            <h3 >Grand Total : ${grandTotal} </h3> 
            
            <button className="btn btn-success"><Nav.Link href="/checkout" >Checkout</Nav.Link></button>

        </MainScreen>
        </>    

    );
    }


