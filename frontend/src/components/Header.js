import React, { useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
import { logout } from "../actions/userActions";


function Header({ setSearch }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {}, [userInfo]);

  
  return (
    <Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
      <Container>
        <Navbar.Brand href="/">Shop 24X7</Navbar.Brand>
        <Nav.Link href="/">Homepage</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link href="/products">Products</Nav.Link>
        <Nav.Link href="/categories">Categories</Nav.Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {/* {userInfo && (
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search Product"
                  className="mr-sm-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            )} */}
          </Nav>
          

          

          <Nav>
            {userInfo ? (
              <>
               
                <NavDropdown
                  title="Admin Only"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/admin/products">
                  Add New Product
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/orders">
                  Manage Orders
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title={`${userInfo.first_name}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : 
            
              (
                <Nav.Link href="/login">Login</Nav.Link>
              )
            
            }

          </Nav>
        </Navbar.Collapse>
        <Nav.Link href="/cart">🛒</Nav.Link>
      </Container>
    </Navbar>
  );
}

export default Header;
