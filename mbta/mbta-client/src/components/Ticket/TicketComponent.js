import React, {Component} from 'react';
import axios from "axios";
import {Button, Table} from "react-bootstrap";
import FormComponent from "../FormComponent";
import TicketUpdateDialog from "./TicketUpdateDialog";
import UserUpdateDialog from "../User/UserUpdateDialog";

class TicketComponent extends Component {

    constructor(state) {
        super(state);

        this.state = {
            tickets: [],
            isPressed: false
        };
    }

    componentDidMount() {
        switch (sessionStorage.getItem("userType")){
            case 'Admin':
                axios.get('/api/ticket')
                    .then(response => {
                        this.setState({tickets: response.data})
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case 'Agent':
                axios.get('/api/ticket')
                    .then(response => {
                        this.setState({tickets: response.data})
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case'Customer':
                axios.get('/api/ticket')
                    .then(response => {
                        this.setState({tickets: response.data})
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            default:
        }

    }

    handleButton = () => {
        this.setState({isPressed: true});
    };

    deleteEntry(ticket) {
        axios.delete('/api/deleteTicket/' + ticket)
            .then(() => axios.get('/api/ticket'))
            .then(ticket => {
                // console.log("Data: " + response.data[0])
                this.setState({tickets: ticket.data})
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        switch (sessionStorage.getItem("userType")) {
            default:
            case "Customer" :
                return (
                    <React.Fragment>
                        <Button onClick={this.handleButton}>
                            Create Ticket
                        </Button>
                        {this.state.isPressed && <FormComponent componentType={'Ticket'}/>}
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Source Station ID</th>
                                <th>Destination Station ID</th>
                                <th>Distance</th>
                                <th>Price</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.tickets.map(ticket => (
                                    <tr key={ticket._id}>
                                        <td>{ticket._id}</td>
                                        <td>{ticket.sourceStation}</td>
                                        <td>{ticket.destinationStation}</td>
                                        <td>{ticket.distance}</td>
                                        <td>{ticket.price}</td>
                                        <td>
                                            <Button variant="danger"
                                                    onClick={() => this.deleteEntry(ticket._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                        <td>
                                            <TicketUpdateDialog
                                                id={ticket._id}
                                                sourceStation={ticket.sourceStation}
                                                destinationStation={ticket.destinationStation}
                                                distance={ticket.distance}
                                                price={ticket.price}
                                            />
                                        </td>

                                    </tr>))
                            }
                            </tbody>
                        </Table>
                    </React.Fragment>
                )
            case "Agent" :
                return (
                    <React.Fragment>
                        {this.state.isPressed && <FormComponent componentType={'Ticket'}/>}
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Source Station ID</th>
                                <th>Destination Station ID</th>
                                <th>Distance</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.tickets.map(ticket => (
                                    <tr key={ticket._id}>
                                        <td>{ticket._id}</td>
                                        <td>{ticket.sourceStation}</td>
                                        <td>{ticket.destinationStation}</td>
                                        <td>{ticket.distance}</td>
                                        <td>{ticket.price}</td>
                                    </tr>))
                            }
                            </tbody>
                        </Table>
                    </React.Fragment>
                )
            case "Admin":
                return (
                    <React.Fragment>
                        {this.state.isPressed && <FormComponent componentType={'Ticket'}/>}
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Source Station ID</th>
                                <th>Destination Station ID</th>
                                <th>Distance</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.tickets.map(ticket => (
                                    <tr key={ticket._id}>
                                        <td>{ticket._id}</td>
                                        <td>{ticket.sourceStation}</td>
                                        <td>{ticket.destinationStation}</td>
                                        <td>{ticket.distance}</td>
                                        <td>{ticket.price}</td>
                                    </tr>))
                            }
                            </tbody>
                        </Table>
                    </React.Fragment>
                )
        }
    }
}

export default TicketComponent;