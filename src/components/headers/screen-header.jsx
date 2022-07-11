import React from 'react'
import { NavbarText, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Navbar, Collapse, Nav } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMsal } from "@azure/msal-react";
import {logoutAzure} from '../../slices/authSlice'
export default function ScreenHeader() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { instance } = useMsal();

    const handleSignOut = () => {
        instance.logoutPopup().catch(e => {
                console.error(e);
            });
        console.log('handleSignOut');       
        dispatch(logoutAzure());
        navigate('/sign-in');
    }

    return (
             <Navbar color="dark"expand="md" dark>
                <NavbarBrand>
                    Amazing Energy Management System
                </NavbarBrand>
                <Collapse navbar>
                <Nav className="me-auto" navbar >
                    
                </Nav>
                <NavbarText>{auth.email}</NavbarText>
                <UncontrolledDropdown inNavbar nav>
                    <DropdownToggle style={{fontSize: 20, color: 'white'}} caret nav>
                        {auth.name}
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem divider />
                        <DropdownItem onClick={handleSignOut}>
                            Logout 
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Collapse>
            </Navbar>
    );
}
