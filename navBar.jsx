import React,{Component}from"react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown } from 'react-bootstrap';
class NavBar extends Component
{   render()
    {   const {user}=this.props;
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-warning">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" >Home</Link>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul class="navbar-nav me-auto mb-2">
                            
                            {!user && (<li className="nav-item">
                                    <Link to="/empapp/loginuser" className="nav-link">Login</Link>
                                </li>)}
                            
                            {user ?
                                user.role==="manager" ?(
                            <React.Fragment>
                                <li class="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                        Customers
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href="/addCustomer">Add Customer</Dropdown.Item>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href="/allCustomers?page=1">View All Customers</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </li>
                                <li className="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                        Transactions
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href="/allCheque?page=1">Cheques</Dropdown.Item>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href="/allNet?page=1">Net Banking</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </li>
                            </React.Fragment>)
                            :(
                            <React.Fragment>
                                <li class="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                        View
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href={`/viewCheque/${user.name}?page=1`}>Cheques</Dropdown.Item>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href={`/viewNet/${user.name}?page=1`}>Net Banking</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </li>
                                <li class="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                        Details
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href="/customerDetails">Customer</Dropdown.Item>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href="/nomineeDetails">Nominee</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </li>
                                <li className="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                        Transactions
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href="/addPayee">Add Payee</Dropdown.Item>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href="/cheque">Cheque</Dropdown.Item>
                                        <Dropdown.Item className="nav-link text-dark m-0 p-0" href="/netBanking">Net Banking</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </li>
                            </React.Fragment>
                            )
                        :""}
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2">
                            {user && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link to="/empapp/logoutuser" className="nav-link">Welcome {user.name}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link">Logout</Link>
                                </li>    
                            </React.Fragment>)}
                        </ul>
                    </div>
                </div>
            </nav>)
    }

}export default NavBar;