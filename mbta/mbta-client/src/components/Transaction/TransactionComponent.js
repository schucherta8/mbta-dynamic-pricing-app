import React, {Component}  from 'react';
import axios from "axios";
import {Button, Table} from "react-bootstrap";
import ShowTicketDialog from "../Ticket/ShowTicketDialog";
import TransactionUpdateDialog from "./TransactionUpdateDialog";

class TransactionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            username: this.props.username,
            viewTicket: false,
            ticket: []
        };
    }


    componentDidMount() {
        this._isMounted = true;
        axios.get('/api/transactions/'+sessionStorage.getItem('user'))
            .then(response => {
                if (this._isMounted) {
                this.setState({transactions: response.data});
            }})
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    showTicketInfo(ticketid) {
        this.setState({viewTicket : true});
        axios.get('/api/ticket/' + ticketid)
            .then(response => {
                this.setState({ticket: response.data});
            })
            .catch(error => {
                console.log(error);
            });
        console.log("aaa" + this.state.ticket.sourceStation);
    }


    deleteEntry(transaction) {
        axios.delete('/api/cascadeDeleteTransaction/' + transaction)
            .then(() => axios.get('/api/transactions/getTransactions'))
            .then(transaction => {
                // console.log("Data: " + response.data[0])
                this.setState({transactions: transaction.data})
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        let i =1;
        let setToFalse = () => this.setState({viewTicket : false});
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer ID</th>
                        <th>Ticket ID</th>
                        <th>Time of Transaction</th>
                        <th>Show Ticket Info</th>
                        <th>Delete Transactions</th>
                        <th>Update Transactions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.transactions.map(transaction =>
                            <tr key={transaction._id}>
                                <td>{i++}</td>
                                <td>{transaction.customer}</td>
                                <td>{transaction.ticket}</td>
                                <td>{transaction.timeOfTransaction}</td>
                                <td> <Button variant ="success"  onClick = {() => this.showTicketInfo(transaction.ticket)}>
                                        Ticket Info
                                </Button>
                                    <ShowTicketDialog show = {this.state.viewTicket}
                                     onHide = {setToFalse}
                                     ticket = {this.state.ticket}/>
                                </td>
                                <td>
                                    <Button variant="danger"
                                            onClick={() => this.deleteEntry(transaction._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                                <td>
                                    <TransactionUpdateDialog
                                        id={transaction._id}
                                        name={transaction.customer}
                                        latitude={transaction.ticket}
                                        longitude={transaction.timeOfTransaction}
                                    />
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        );

    }
}

export default TransactionComponent;