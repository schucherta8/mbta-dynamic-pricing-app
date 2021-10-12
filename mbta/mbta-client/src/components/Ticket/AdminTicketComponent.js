import React, {Component} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import FormComponent from "../FormComponent";

class AdminTicketComponent extends Component {

    constructor(state) {
        super(state);

        this.state = {
            tickets: [],
            isPressed: false
        };
    }

    componentDidMount() {
        axios.get('/api/ticket')
            .then(response => {
                this.setState({tickets: response.data})
            })
            .catch(error => {
                console.log(error);
            });
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

export default AdminTicketComponent;