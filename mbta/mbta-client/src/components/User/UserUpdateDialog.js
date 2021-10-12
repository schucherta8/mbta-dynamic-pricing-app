import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";


class UserUpdateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.id,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            username: this.props.username,
            password: this.props.password,
            email:this.props.email,
            phoneNumber:this.props.phoneNumber
        }
    }

    handleInput = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = e => {
        axios.put('/api/user/update', this.state)
            .then(res => console.log(res));
    };


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="formPlainTextName">
                    <Form.Label column sm={"10"}>
                        FirstName
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name="firstName"
                        placeholder={"Enter first name"}
                        style={{width: '70%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridLastName"}>
                    <Form.Label column sm={"10"}>
                        LastName
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name="lastName"
                        placeholder={"Enter LastName"}
                        style={{width: '70%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridEmail"}>
                    <Form.Label column sm={"10"}>
                        Email
                    </Form.Label>
                    <Form.Control
                        type={"email"}
                        name="email"
                        placeholder={"Enter Email"}
                        style={{width: '70%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridPhoneNumber"}>
                    <Form.Label column sm={"10"}>
                        PhoneNumber
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name="phoneNumber"
                        placeholder={"Enter PhoneNumber"}
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

export default UserUpdateDialog;