import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const ProfileScreen = ({ location, history }) => {
  const [first_name, setFn] = useState("");
  const [last_name, setLn] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [pic, setPic] = useState();
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setFn(userInfo.first_name);
      setLn(userInfo.last_name);
      setEmail(userInfo.email);
      setStreet(userInfo.street);
      setCity(userInfo.city);
      setState(userInfo.state);
      setZip(userInfo.zip);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

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

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({first_name,last_name,email, street, city, state,zip, pic }));
  };

  return (

    <MainScreen title="EDIT PROFILE">
     
      <div>
        <Row className="profileContainer">
          <Col md={6}>
         
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="profile-first-name">
                <Form.Label>First Name</Form.Label>
                <br></br>
              <Form.Label><strong>{userInfo.first_name}</strong></Form.Label>
              </Form.Group>

              <Form.Group controlId="profile-last-name">
                <Form.Label>Last Name</Form.Label>
                <br></br>
                <Form.Label><strong>{userInfo.last_name}</strong></Form.Label>
              </Form.Group>

              <Form.Group controlId="profile-email-name">
                <Form.Label>Email</Form.Label>
                <br></br>
                <Form.Label><strong>{userInfo.email}</strong></Form.Label>
              </Form.Group>
           
              {/* <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group> */}
              <Form.Group controlId="street">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Street"
                  value={street || ''}
                  onChange={(e) => setStreet(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={city || ''}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  value={state || ''}
                  onChange={(e) => setState(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="zip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Zip Code"
                  value={zip || ''}
                  onChange={(e) => setZip(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="profile-image">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>
              <Button type="submit" varient="primary">
                Save
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt="" className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
