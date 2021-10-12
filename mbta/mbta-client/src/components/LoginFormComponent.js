import React from 'react';
import Form from "react-bootstrap/Form";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { withRouter } from "react-router";


class LoginFormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userType: ''
        }
    }

    handleUsernameInput = event => {
        this.setState({
            username: event.target.value
        });
    };

    handlePasswordInput = event => {
        this.setState({
            password: event.target.value
        });
    };

    handleSubmit = (event) => {
        const username = this.state.username;
        axios.get('/api/users/' + username).then(res => {
            if(res.data !== null){
                this.props.setLoginStatus(true);
                sessionStorage.setItem('userType',res.data.userType);
                sessionStorage.setItem('user',res.data.username);
                sessionStorage.setItem('password',res.data.password);
                this.props.history.push('/');
                this.props.refreshNavbar();
            }
            else{
                alert("Username or password does not exist.")
            }
        });
        event.preventDefault();
    };

    componentWillUnmount() {
        console.log("We Finished Rendering")
    }

    render() {
        return (
          <React.Fragment>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Row>
                      <Form.Group as={Col} controlId={"loginFormGridUsername"}>
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                              type={"input"}
                              placeholder={"Enter username"}
                              onChange={this.handleUsernameInput}
                              style={{width: '30%'}}
                          />
                      </Form.Group>
                  </Form.Row>
                  <Form.Row>
                      <Form.Group as={Col} controlId={"loginFormGridPassword"}>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                              type={"password"}
                              placeholder={"Enter password"}
                              onChange={this.handlePasswordInput}
                              style={{width: '30%'}}
                          />
                      </Form.Group>
                  </Form.Row>
                      <Button
                          variant="primary"
                          type="submit"
                      >
                          Login
                      </Button>
              </Form>
          </React.Fragment>
        );
    }

}

export default withRouter(LoginFormComponent);