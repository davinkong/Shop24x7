import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";


function MainCartEdit({ match, history }) {
  const [name, setName] = useState();
  const [qty, setQty] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const prodUpdate = useSelector((state) => state.prodUpdate);
  const { loading, error } = prodUpdate;

  const prodDelete = useSelector((state) => state.prodDelete);
  const { loading: loadingDelete, error: errorDelete } = prodDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/cart");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`);

      setName(data.name);
      setQty(data.qty);
      setPrice(data.price);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setName("");
    setPrice("");
    setQty("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(match.params.id, name, qty, price));
    if (!name || !qty || !price) return;

    resetHandler();
    history.push("/cart");
  };

  return (
    <MainScreen title="Edit Quantity">
      <Card>
        <Card.Header>Edit Quantity</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="name">
              {/* <Form.Label>name</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              /> */}
              <Form.Label>Product Name</Form.Label>
                <br></br>
              <Form.Label><strong>{name}</strong></Form.Label>
            </Form.Group>

            <Form.Group controlId="qty">
              <Form.Label>qty</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the qty"
                rows={4}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Form.Group>
            {qty && (
              <Card>
                <Card.Header>Change to</Card.Header>
                <Card.Body>
                  {qty} ?
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="price">
              <Form.Label>price</Form.Label>
              <br></br>
              <Form.Label><strong>${price}</strong></Form.Label>
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Order
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Order
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default MainCartEdit;
