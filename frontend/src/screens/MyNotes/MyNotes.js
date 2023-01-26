import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listProds } from "../../actions/adminActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const prodList = useSelector((state) => state.prodList);
  const { loading, error, products } = prodList;
  
  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const prodDelete = useSelector((state) => state.prodDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = prodDelete;

  const prodCreate = useSelector((state) => state.prodCreate);
  const { success: successCreate } = prodCreate;

  const prodUpdate = useSelector((state) => state.prodUpdate);
  const { success: successUpdate } = prodUpdate;

  useEffect(() => {
    dispatch(listProds());
    if (!userInfo.isAdmin) {
      history.push("/");
      alert("No Authorization, Admin Only")
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.first_name}..`}>
      {console.log(products)}
      <Link to="/add-new-product">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add New Products
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {products &&
        products
          .filter((filteredNote) =>
            filteredNote.name.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((prod) => (
            <Accordion key={prod._id}>
              <Card style={{ margin: 10 }} key={prod._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                     
                    >
      
                      
                    

                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/prod/${prod._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(prod._id)}
                    >
                      Delete
                    </Button>
                  </div>
               
                  
                </Card.Header>
                <Accordion >
                  <Card.Body>
                    <h2>{prod.name}</h2>
                    <h4> Price: ${prod.price}</h4>
                    <blockquote className="blockquote mb-0">
                      <Badge>Quantity:  {prod.qty}</Badge>
                      <footer className="blockquote-footer">
                        Add On: {" "}
                        <cite title="Source Title">
                          {prod.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyNotes;
