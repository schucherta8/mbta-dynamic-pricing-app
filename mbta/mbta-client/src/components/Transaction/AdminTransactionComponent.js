import React, {Component} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FormComponent from "../FormComponent";
import TransactionUpdateDialog from "./TransactionUpdateDialog";
import ShowTicketDialog from "../Ticket/ShowTicketDialog";


class AdminTransactionComponent extends Component {

    constructor(state) {
        super(state);

        this.state = {
            transactions: [],
            isPressed: false,
            viewUpdateFlag: false,
            viewTicket : false,
            transactionupdate: {},
            ticket:[]
        };
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

    componentDidMount() {
        axios.get('/api/transactions/getTransactions')
            .then(response =>
                    this.setState({transactions: response.data}))
            .catch(error => {
                console.log(error);
            })
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

    handleButton = () => {
        this.setState({isPressed: true});
    };

    render() {
        console.log(this.state.transactions);
        let i = 1;
        let setToFalse = () => this.setState({viewTicket : false});
        return (
            <div>
                <Button onClick={this.handleButton}>
                    Create Transaction
                </Button>
                {this.state.isPressed && <FormComponent componentType={'Transaction'}/>}
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

export default AdminTransactionComponent;