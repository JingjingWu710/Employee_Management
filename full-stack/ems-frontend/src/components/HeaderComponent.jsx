import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
    return (
        <Navbar expand="lg" style={{ backgroundColor: '#e3f2fd' }} variant="light">
            <Navbar.Brand style={{ marginLeft: "10px" }} href="#">Employee Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ marginLeft: "10px" }} className="me-auto">
                    <Nav.Link as={NavLink} to="/employees">Employees</Nav.Link>
                    <Nav.Link as={NavLink} to="/departments">Departments</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default HeaderComponent
