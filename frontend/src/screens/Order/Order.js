import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import { listNotes } from "../../actions/notesActions";
import { Link } from "react-router-dom";


export default function Order ({ history, search }){

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
        <div>#{userInfo._id}</div>
        <div>{userInfo.email}</div>
        <span><Link to="/detail">Detail</Link></span>
        
                
   
                
          
     </MainScreen>       
    )
}

