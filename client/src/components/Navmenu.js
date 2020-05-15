import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './navmenu.css'

const Navmenu = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <NavLink className="navbar-brand" to="/">Sell BD</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink className="nav-link mx-2" to="/profile">Profile</NavLink>
                            <NavLink className="nav-link mx-2" to="/allads">All Ads</NavLink>
                            <NavLink className="nav-link mx-2" to="/login">Login</NavLink>
                            <NavLink className="nav-link mx-2" to="/register">Register</NavLink>
                            <NavLink className="btn btn-info mx-2" to="/sell">Sell Products</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navmenu
