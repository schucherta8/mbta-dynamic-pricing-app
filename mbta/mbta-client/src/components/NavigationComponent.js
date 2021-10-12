import React, {Component} from "react";
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import {Jumbotron as Jumbo, Container} from "react-bootstrap";
import tLogo from '../images/t-symbol.svg';
import bg from '../images/bg.jpg';


const Styles = styled.div`
.navbar {
   background-color: lightskyblue;
   height: 65px;
}
  .navbar-brand, .navbar-nav .nav-link {
    color: black;
    &:hover {
      color: white;
    }
  }
  .jumbo {
    background: url(${bg}) no-repeat fixed bottom;
    background-size: cover;
    display: inline-block;
    color: white;
    font-family : "Times New Roman";
    font-style: oblique;
    height: 200px;
    width: 2000px;
    position: relative;
    z-index: 12;
    opacity: .8;
  }
  .overlay {
    background-color: transparent;
    opacity: 1;
    position: absolute;
    top: 20px;
    left: 100px;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;


class NavigationComponent extends Component {
    render() {
        switch (sessionStorage.getItem('userType')) {
            default:
            case 'Guest':
                return (
                    <React.Fragment>
                        <Styles>
                            <Navbar expand='lg'>
                                <Navbar.Brand>
                                    <a href="/#">
                                        <img src={tLogo} style={{width: 200, marginLeft: -70}} alt="T-Logo"/>
                                    </a></Navbar.Brand>
                                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                                <Navbar.Collapse id='basic-navbar-nav'/>
                                <Nav className="ml-auto">
                                    <Nav.Item> <Nav.Link href={'/'}> Home </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/signIn'> Login Session </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/profile'> User Profile </Nav.Link> </Nav.Item>
                                </Nav>
                            </Navbar>
                            <Jumbo fluid className = "jumbo">
                                <div className = "overlay">
                                    <Container>
                                        <h1> MBTA Booking System </h1>
                                    </Container>
                                </div>
                            </Jumbo>
                        </Styles>
                    </React.Fragment>
                );
            case 'Customer':
                return (
                    <React.Fragment>
                        <Styles>
                            <Navbar expand='lg'>
                                <Navbar.Brand>
                                    <a href="/#">
                                        <img src={tLogo} style={{width: 200, marginLeft: -70}} alt="T-Logo"/>
                                    </a></Navbar.Brand>
                                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                                <Navbar.Collapse id='basic-navbar-nav'/>
                                <Nav className="ml-auto">
                                    <Nav.Item> <Nav.Link href={'/'}> Home </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/tickets'> Tickets </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/signIn'> Login Session  </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/profile'> User Profile </Nav.Link> </Nav.Item>
                                </Nav>
                            </Navbar>
                            <Jumbo fluid className = "jumbo">
                                <div className = "overlay">
                                    <Container>
                                        <h1> MBTA Booking System </h1>
                                    </Container>
                                </div>
                            </Jumbo>
                        </Styles>
                    </React.Fragment>
                );
            case 'Agent':
                return (
                    <React.Fragment>
                        <Styles>
                            <Navbar expand='lg'>
                                <Navbar.Brand>
                                    <a href="/#">
                                        <img src={tLogo} style={{width: 200, marginLeft: -70}} alt="T-Logo"/>
                                    </a></Navbar.Brand>
                                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                                <Navbar.Collapse id='basic-navbar-nav'/>
                                <Nav className="ml-auto">
                                    <Nav.Item> <Nav.Link href={'/'}> Home </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/signIn'> Login Session  </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/profile'> Agent Profile </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/users'> Customers </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/AdminTransactions'> Transactions </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/tickets'> Tickets </Nav.Link> </Nav.Item>
                                </Nav>
                            </Navbar>
                            <Jumbo fluid className = "jumbo">
                                <div className = "overlay">
                                    <Container>
                                        <h1> MBTA Ticketing System </h1>
                                    </Container>
                                </div>
                            </Jumbo>
                        </Styles>
                    </React.Fragment>
                );
            case 'Info_point':
                return (
                    <React.Fragment>
                        <Styles>
                            <Navbar expand='lg'>
                                <Navbar.Brand>
                                    <a href="/#">
                                        <img src={tLogo} style={{width: 200, marginLeft: -70}} alt="T-Logo"/>
                                    </a></Navbar.Brand>
                                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                                <Navbar.Collapse id='basic-navbar-nav'/>
                                <Nav className="ml-auto">
                                    <Nav.Item> <Nav.Link href={'/'}> Home </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/signIn'> Login Session  </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/profile'> Customer Service Profile </Nav.Link> </Nav.Item>
                                    <Nav.Item><Nav.Link href={'/information'}>Information</Nav.Link></Nav.Item>
                                </Nav>
                            </Navbar>
                            <Jumbo fluid className = "jumbo">
                                <div className = "overlay">
                                    <Container>
                                        <h1> MBTA Booking System </h1>
                                    </Container>
                                </div>
                            </Jumbo>
                        </Styles>
                    </React.Fragment>
                );
            case 'Manager':
                return (
                    <React.Fragment>
                        <Styles>
                            <Navbar expand='lg'>
                                <Navbar.Brand>
                                    <a href="/#">
                                        <img src={tLogo} style={{width: 200, marginLeft: -70}} alt="T-Logo"/>
                                    </a></Navbar.Brand>
                                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                                <Navbar.Collapse id='basic-navbar-nav'/>
                                <Nav className="ml-auto">
                                    <Nav.Item> <Nav.Link href={'/'}> Home </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/signIn'> Login Session  </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/profile'> Manager Profile </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/users'> Agents </Nav.Link> </Nav.Item>
                                </Nav>
                            </Navbar>
                            <Jumbo fluid className = "jumbo">
                                <div className = "overlay">
                                    <Container>
                                        <h1> MBTA Booking System </h1>
                                    </Container>
                                </div>
                            </Jumbo>
                        </Styles>
                    </React.Fragment>
                );
            case 'Admin':
                return (
                    <React.Fragment>
                        <Styles>
                            <Navbar expand='lg'>
                                <Navbar.Brand>
                                    <a href="/#">
                                        <img src={tLogo} style={{width: 200, marginLeft: -70}} alt="T-Logo"/>
                                    </a></Navbar.Brand>
                                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                                <Navbar.Collapse id='basic-navbar-nav'/>
                                <Nav className="ml-auto">
                                    <Nav.Item> <Nav.Link href={'/'}> Home </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/signIn'> Login Session  </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/profile'> Admin Profile </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/users'> Users </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/stations'> Stations </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/AdminTransactions'> Transactions </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link href='/AdminTickets'> Tickets </Nav.Link> </Nav.Item>
                                </Nav>
                            </Navbar>
                            <Jumbo fluid className = "jumbo">
                                <div className = "overlay">
                                    <Container>
                                        <h1> MBTA Booking System </h1>
                                    </Container>
                                </div>
                            </Jumbo>
                        </Styles>
                    </React.Fragment>
                );
        }
    }
}

export default NavigationComponent;