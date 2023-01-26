import React from "react";
import { Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
       
      }}
    >
        
          <Navbar collapseOnSelect expand="xxl" className="container-fluid" bg="warning" variant="dark">Copyright &copy; 2022</Navbar>
        
    </footer>
  );
};

export default Footer;
