import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

class SignUpFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            userType: 'Customer',
            validSubmit: false
        }
    }

    handleSubmit = event => {
        if(this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.username.length > 0
            && this.state.password.length > 0 && this.state.email.length > 0 && this.state.phoneNumber.length > 0){
            axios.post("/api/profile", this.state).then(res => {
                console.log(res);
            });
        }
        else {
            alert("All fields must be filled.");
            event.preventDefault();
        }
    };

    changeInputHandler = (event) => {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId={"formGridFirstName"}>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type={"input"}
                                name = "firstName"
                                placeholder={"Enter first name"}
                                onChange={this.changeInputHandler}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId={"formGridLastName"}>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                as={"input"}
                                name = "lastName"
                                placeholder={"Enter last name"}
                                onChange={this.changeInputHandler}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId={"formGridUsername"}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type={"input"}
                                name = "username"
                                placeholder={"Enter username"}
                                onChange={this.changeInputHandler}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId={"formGridPassword"}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={"password"}
                                name = "password"
                                placeholder={"Enter password"}
                                onChange={this.changeInputHandler}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId={"formGridEmail"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type={"email"}
                                name = "email"
                                placeholder={"Enter email"}
                                onChange={this.changeInputHandler}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId={"formGridPhone"}>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type={"input"}
                                name = "phoneNumber"
                                placeholder={"Enter phone number"}
                                onChange={this.changeInputHandler}
                            />
                        </Form.Group>
                    </Form.Row>
                    <ButtonToolbar>
                        <ToggleButtonGroup
                            type="radio"
                            name="userType"
                            defaultValue={"Customer"}
                        >
                            <ToggleButton
                                value={"Customer"}
                                onChange={this.changeInputHandler}
                            >
                                Customer
                            </ToggleButton>
                            <ToggleButton
                                value={"Agent"}
                                onChange={this.changeInputHandler}
                            >
                                Agent
                            </ToggleButton>
                            <ToggleButton
                                value={"Info_point"}
                                onChange={this.changeInputHandler}
                            >
                                Customer Service
                            </ToggleButton>
                            <ToggleButton
                                value={"Manager"}
                                onChange={this.changeInputHandler}
                            >
                                Manager
                            </ToggleButton>
                            <ToggleButton
                                value={"Admin"}
                                onChange={this.changeInputHandler}
                            >
                                Admin
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default SignUpFormComponent;