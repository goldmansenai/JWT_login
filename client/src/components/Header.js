import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  Button,
} from "reactstrap";

function Header() {
  const obj = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.reload(true);
  };
  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="" light>
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler
          aria-controls="responsive-navbar-nav"
          onClick={function noRefCheck() {}}
        />
        <Collapse navbar id="responsive-navbar-nav">
          {obj === null && (
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/register">Registrar</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            </Nav>
          )}
          {obj !== null && (
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/register" disabled>
                  Registrar
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login" disabled>
                  Login
                </NavLink>
              </NavItem>
            </Nav>
          )}
          <NavbarText>
            {obj?.username && (
              <div className="d-flex align-items-start">
                <h3 className="mx-2">
                  <b>{obj?.username}</b>
                </h3>
                <Button onClick={logout}>Logout</Button>
              </div>
            )}
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
