import React from "react";
import Form from "react-bootstrap/Form";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";

class EditProfileComponent extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state= {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            data: {}
        }
    }
    componentDidMount() {
        this._isMounted = true;
        const username = sessionStorage.getItem('user');
        axios.get('/api/users/' + username)
            .then(res => {
                if(this._isMounted){
                    const data = {
                        _id: res.data._id,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        username: res.data.username,
                        password: res.data.password,
                        email: res.data.email,
                        phoneNumber: res.data.phoneNumber
                    };
                    this.setState({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        username: res.data.username,
                        password: res.data.password,
                        email: res.data.email,
                        phoneNumber: res.data.phoneNumber,
                        data: data
                    });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleInput = event => {
        this.setState({[event.target.name] : event.target.value});
    };

    handleSubmit = () => {
        const previousValues = Object.values(this.state.data);
        const userKeys = Object.keys(this.state.data);
        const updatedValues = Object.values(this.state);
        let userData = {_id: this.state.data._id};
        for(let i =0; i < previousValues.length-1; i++){
            let value = previousValues[i+1];
            if(updatedValues[i] !== previousValues[i+1] && updatedValues[i].length > 0){
                value = updatedValues[i];
            }
            userData[userKeys[i+1]] = value;
        }
        axios.put('/api/profile/update',userData)
            .then(res => console.log(res))
    };

    render() {
        return (
          <React.Fragment>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="formPlainTextFirstName">
                    <Form.Label column sm={"2"}>
                        First name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            plaintext
                            readOnly
                            disabled
                            defaultValue={this.state.data.firstName}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridFirstName"}>
                    <Form.Label column sm={"2"}>
                        Update first name
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name = "firstName"
                        placeholder={"Enter first name"}
                        style={{width: '30%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId="formPlainTextLastName">
                    <Form.Label column sm={"2"}>
                        Last name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            plaintext
                            readOnly
                            disabled
                            defaultValue={this.state.data.lastName}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridLastName"}>
                    <Form.Label column sm={"2"}>
                        Update last name
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name = "lastName"
                        placeholder={"Enter last name"}
                        style={{width: '30%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId="formPlainTextUsername">
                    <Form.Label column sm={"2"}>
                        Username
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            plaintext
                            readOnly
                            disabled
                            defaultValue={this.state.data.username}
                        />
                    </Col>
                </Form.Group>
                {/*<Form.Group as={Row} controlId={"formGridUsername"}>*/}
                {/*    <Form.Label column sm={"2"}>*/}
                {/*        Update username*/}
                {/*    </Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type={"input"}*/}
                {/*        name = "username"*/}
                {/*        placeholder={"Enter username"}*/}
                {/*        style={{width: '30%'}}*/}
                {/*        onChange={this.handleInput}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                <Form.Group as={Row} controlId="formPlainTextPassword">
                    <Form.Label column sm={"2"}>
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            plaintext
                            readOnly
                            disabled
                            defaultValue={this.state.data.password} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridPassword"}>
                    <Form.Label column sm={"2"}>
                        Update password
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name = "password"
                        placeholder={"Enter password"}
                        style={{width: '30%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId="formPlainTextEmail">
                <Form.Label column sm={"2"}>
                    Email
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        plaintext
                        readOnly
                        disabled
                        defaultValue={this.state.data.email} />
                </Col>
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridEmail"}>
                    <Form.Label column sm={"2"}>
                        Update email
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name = "email"
                        placeholder={"Enter email"}
                        style={{width: '30%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId="formPlainTextPhone">
                    <Form.Label column sm={"2"}>
                        Phone
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            plaintext
                            readOnly
                            disabled
                            defaultValue={this.state.data.phoneNumber} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridPhone"}>
                    <Form.Label column sm={"2"}>
                        Update phone
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name = "phoneNumber"
                        placeholder={"Enter phone"}
                        style={{width: '30%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
          </React.Fragment>
        );
    }
}

export default EditProfileComponent