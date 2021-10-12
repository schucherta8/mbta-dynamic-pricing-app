import React, {Component} from 'react';
import {Button, Col} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";


class TicketUpdateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.id,
            sourceStation: this.props.sourceStation,
            destinationStation: this.props.destinationStation,
            distance: this.props.distance,
            price: this.props.price
        }
    }

    handleInput = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = e => {
        axios.put('/api/ticket/update', this.state)
            .then(res => console.log(res));
    };


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="formPlainTextName">

                    <Form.Label column sm={"5"}>
                        Source Station
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name="sourceStation"
                        placeholder={"Enter Source"}
                        style={{width: '70%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId="formPlainTextName">
                    <Form.Label column sm={"5"}>
                        Destination Station
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name="destinationStation"
                        placeholder={"Enter Destination"}
                        style={{width: '70%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId="formPlainTextName">
                    <Form.Label column sm={"5"}>
                        Distance
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name="distance"
                        placeholder={"Enter Distance"}
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
export default TicketUpdateDialog;