import React, {Component} from 'react';
import axios from "axios";
import {Table, Button} from "react-bootstrap";
import FormComponent from "../FormComponent";
import UserUpdateDialog from "./UserUpdateDialog";

export class UsersComponent extends Component {
    constructor(state) {
        super(state);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.state = {
            users: [],
            isPressed: false,
            viewUpdateFlag: false,
            userupdate: {}
        };
    }

    componentDidMount() {
        switch (sessionStorage.getItem("userType")) {
            case "Agent":
                axios.get('/api/getUsersByUserType/Customer')
                    .then(response => {
                        console.log("Our Data: " + response.data);
                        this.setState({users: response.data})
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case "Manager":
                axios.get('/api/getUsersByUserType/Agent')
                    .then(response => {
                        console.log("Our Data: " + response.data);
                        this.setState({users: response.data})
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            case "Admin":
                axios.get('/api/users/getUsers')
                    .then(response => {
                        this.setState({users: response.data})
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            default:
        }
    }

    deleteEntry(user) {
        // this.setState({users: []});
        axios.delete('/api/deleteUser/' + user.username)
            .then(() => axios.get('/api/users/getUsers'))
            .then(user => {
                // console.log("Data: " + response.data[0])
                this.setState({users: user.data})
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteEntryOfAgents(user) {
        // this.setState({users: []});
        axios.delete('/api/deleteUser/' + user.username)
            .then(() => axios.get('/api/getUsersByUserType/Agent'))
            .then(user => {
                // console.log("Data: " + response.data[0])
                this.setState({users: user.data})
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteEntryOfCustomers(user) {
        // this.setState({users: []});
        axios.delete('/api/deleteUser/' + user.username)
            .then(() => axios.get('/api/getUsersByUserType/Customer'))
            .then(user => {
                // console.log("Data: " + response.data[0])
                this.setState({users: user.data})
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleButton = () => {
        this.setState({isPressed: true});
    };

    render() {
        switch (sessionStorage.getItem("userType")) {
            case "Agent":
                return (
                    <React.Fragment>
                        <Button onClick={this.handleButton}>
                            Create Customer
                        </Button>
                        {this.state.isPressed && <FormComponent componentType={'AgentCustomer'}/>}
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Type</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Delete User</th>
                                <th>Update User</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.userType}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.password}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <Button variant="danger"
                                                    onClick={() => this.deleteEntryOfCustomers(user)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                        <td>
                                            <UserUpdateDialog
                                                id={user._id}
                                                firstName={user.firstName}
                                                lastName={user.lastName}
                                                username={user.username}
                                                password={user.password}
                                                email={user.email}
                                                phoneNumber={user.phoneNumber}
                                            />
                                        </td>
                                    </tr>))
                            }
                            </tbody>
                        </Table>

                    </React.Fragment>
                );
            case "Manager":
                return (
                    <React.Fragment>
                        <Button onClick={this.handleButton}>
                            Create Agent
                        </Button>
                        {this.state.isPressed && <FormComponent componentType={'ManagerAgent'}/>}
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Type</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Delete User</th>
                                <th>Update User</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.userType}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.password}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <Button variant="danger"
                                                    onClick={() => this.deleteEntryOfAgents(user)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                        <td>
                                            <UserUpdateDialog
                                                id={user._id}
                                                firstName={user.firstName}
                                                lastName={user.lastName}
                                                username={user.username}
                                                password={user.password}
                                                email={user.email}
                                                phoneNumber={user.phoneNumber}
                                            />
                                        </td>
                                    </tr>))
                            }
                            </tbody>
                        </Table>
                    </React.Fragment>
                );
            default:
            case "Admin":
                return (
                    <React.Fragment>
                        <Button onClick={this.handleButton}>
                            Create User
                        </Button>
                        {this.state.isPressed && <FormComponent componentType={'User'}/>}
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Type</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>DeleteUser</th>
                                <th>UpdateUser</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.userType}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.password}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <Button variant="danger"
                                                    onClick={() => this.deleteEntry(user)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                        <td>
                                            <UserUpdateDialog
                                                id={user._id}
                                                firstName={user.firstName}
                                                lastName={user.lastName}
                                                username={user.username}
                                                password={user.password}
                                                email={user.email}
                                                phoneNumber={user.phoneNumber}
                                            />
                                        </td>
                                    </tr>))
                            }
                            </tbody>
                        </Table>
                    </React.Fragment>
                );
        }
    }
}

export default UsersComponent;