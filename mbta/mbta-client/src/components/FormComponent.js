import React from 'react';
import Form from "react-bootstrap/Form";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        switch (this.props.componentType) {
            case 'User':
                this.state ={
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    email: '',
                    phoneNumber: '',
                    userType: ''
                };
                break;
            case 'AgentCustomer':
                this.state ={
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    email: '',
                    phoneNumber: '',
                    userType: 'Customer'
                };
                break;
            case 'ManagerAgent':
                this.state ={
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    email: '',
                    phoneNumber: '',
                    userType: 'Agent'
                };
                break;
            case 'Station':
                this.state = {
                    _id: 0,
                    name: '',
                    latitude: 0,
                    longitude: 0
                };
                break;
            case 'Transaction':
            case 'Ticket':
                this.state = {
                    username: '',
                    sourceStation: '',
                    destinationStation: '',
                };
                break;
            default:
        }
    }

    handleSubmit = () => {
        switch (this.props.componentType) {
            case 'Station':
                axios.post("/api/createStation", this.state)
                    .then(res => {
                        if (res.data !== null) {
                            console.log(res.data);
                        }
                    });
                break;
            case 'ManagerAgent':
            case 'AgentCustomer':
            case 'User':
                if(!(this.state.userType === 'Customer' || this.state.userType === 'Agent'
                    || this.state.userType === 'Manager' || this.state.userType === 'Info_point'
                    || this.state.userType === 'Admin')){
                    alert("Not a valid user type.");
                    break;
                }
                if(this.state.username.length < 1 || this.state.password < 1){
                    alert("Username or password be filled");
                    break;
                }
                axios.post('/api/profile',this.state)
                    .then(res => console.log(res.data));
                break;
            case 'Transaction':
            case 'Ticket':
                axios.post('/api/createTransaction',this.state)
                    .then(res => console.log(res.data));
                break;
            default:
        }
    };

    changeInputHandler = (event) => {
        this.setState({[event.target.name] : event.target.value});
    };

    render() {
        switch (this.props.componentType) {
            case 'User':
                return (
                    <React.Fragment>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"userFormFirstName"}>
                                    <Form.Label><b>First Name</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"firstName"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"userForLastName"}>
                                    <Form.Label><b>Last Name</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"lastName"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridUsername"}>
                                    <Form.Label><b>Username</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"username"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridPassword"}>
                                    <Form.Label><b>Password</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"password"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridEmail"}>
                                    <Form.Label><b>Email</b></Form.Label>
                                    <Form.Control
                                        type={"email"}
                                        onChange={this.changeInputHandler}
                                        name={"email"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridPhone"}>
                                    <Form.Label><b>Phone Number</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"phoneNumber"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridUserType"}>
                                    <Form.Label><b>User Type</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"userType"}
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Form.Row>
                        </Form>
                    </React.Fragment>
                );
            case 'ManagerAgent':
            case 'AgentCustomer':
                return (
                    <React.Fragment>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"userFormFirstName"}>
                                    <Form.Label><b>First Name</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"firstName"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"userForLastName"}>
                                    <Form.Label><b>Last Name</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"lastName"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridUsername"}>
                                    <Form.Label><b>Username</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"username"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridPassword"}>
                                    <Form.Label><b>Password</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"password"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridEmail"}>
                                    <Form.Label><b>Email</b></Form.Label>
                                    <Form.Control
                                        type={"email"}
                                        onChange={this.changeInputHandler}
                                        name={"email"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridPhone"}>
                                    <Form.Label><b>Phone Number</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"phoneNumber"}
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Form.Row>
                        </Form>
                    </React.Fragment>
                );
            case 'Station':
                return (
                    <React.Fragment>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"stationFormID"}>
                                    <Form.Label><b>ID</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        placeholder={"Enter station id"}
                                        onChange={this.changeInputHandler}
                                        name={"_id"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"stationFormName"}>
                                    <Form.Label><b>Station Name</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        placeholder={"Enter station name"}
                                        onChange={this.changeInputHandler}
                                        name={"name"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"stationFormLatitude"}>
                                    <Form.Label><b>Latitude</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        placeholder={"Enter station latitude"}
                                        onChange={this.changeInputHandler}
                                        name={"latitude"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"loginFormGridLongitude"}>
                                    <Form.Label><b>Longitude</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        placeholder={"Enter station longitude"}
                                        onChange={this.changeInputHandler}
                                        name={"longitude"}
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Form.Row>
                        </Form>
                    </React.Fragment>
                );
            case 'Transaction':
            case 'Ticket':
                return (
                    <React.Fragment>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"ticketUser"}>
                                    <Form.Label><b>Username</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"username"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"ticketSource"}>
                                    <Form.Label><b>Source</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"sourceStation"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"ticketDestination"}>
                                    <Form.Label><b>Destination</b></Form.Label>
                                    <Form.Control
                                        type={"input"}
                                        onChange={this.changeInputHandler}
                                        name={"destinationStation"}
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Form.Row>
                        </Form>
                    </React.Fragment>
                );
            default:
        }
    }
}
export default FormComponent;