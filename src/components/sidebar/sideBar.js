import React from 'react'
import { NavLink as NavLinkRRD } from "react-router-dom";
import {
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
  } from "reactstrap";

import PortalRoute from '../../routes/portal-route';

const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.route}
            tag={NavLinkRRD}
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

export default function SideBar() {
  return (
    <>
        <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main" >
            <Container fluid>
                <h2>AEMS</h2>
                <Nav navbar>
                    {createLinks(PortalRoute)}
                </Nav>
            </Container>
        </Navbar>
    </>
  )
}
