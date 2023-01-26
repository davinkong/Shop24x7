import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/adminActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateNote({ history }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [pic, setPic] = useState();
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const prodCreate = useSelector((state) => state.prodCreate);
  const { loading, error } = prodCreate;

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
    
  };

  const resetHandler = () => {
    setName("");
    setPrice("");
    setQty("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(name, qty, price, pic));
    if (!name || !qty || !price) return;

    
    history.push("/admin/products");
  };

  useEffect(() => {
    

  }, []);

  return (
    <MainScreen title="Add New Products">
      <Card>
        <Card.Header>Add new product</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="title"
                value={name}
                placeholder="Enter the name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>qty</Form.Label>
              <Form.Control
                type="number"
                value={qty}
                placeholder="Enter the qty"
                rows={4}
                onChange={(e) => setQty(e.target.value)}
              />
            </Form.Group>
            {qty && (
              <Card>
                <Card.Header>Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{qty}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="price">
              <Form.Label>price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                placeholder="Enter the price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            {" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="product-image">
                <Form.Label>Product Image</Form.Label>
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  value={pic}
                  label=""
                  custom
                />
              </Form.Group>
            <Button type="submit" variant="primary">
              Add
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
