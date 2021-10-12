import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";


class TransactionUpdateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.id,
            customer: this.props.customer,
            ticket: this.props.ticket,
            timeOfTransaction: this.props.timeOfTransaction,
        }
    }

    handleInput = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = e => {
        axios.put('/api/transaction/update', this.state)
            .then(res => console.log(res));
    };


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="formPlainTextName">
                    <Form.Label column sm={"5"}>
                        Time of Transaction
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name="timeOfTransaction"
                        placeholder={"Enter time"}
                        style={{width: '70%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Update
                </Button>
            </Form>
        );
    }
}
export default TransactionUpdateDialog;