import React from 'react';
import LoginFormComponent from "./LoginFormComponent";
import Button from "react-bootstrap/Button";
import {NavLink, Route} from "react-router-dom";

class LoginComponent extends React.Component {

    handleLogout = () => {
        this.props.setLoginStatus(false);
        sessionStorage.setItem('userType','Guest');
        sessionStorage.setItem('user','');
        sessionStorage.setItem('password','');
    };

    render() {
        if(this.props.isLoggedIn === 'true'){
            return (
                <React.Fragment>
                    <h1>Sign Out</h1>
                    <p>You are currently logged in. Do you wish to sign out?</p>
                    <Button type={"button"} onClick={this.handleLogout}>Logout</Button>
                    <Route>
                        <NavLink
                            to="/profile"
                            activeClassName="active"
                        >View Profile
                        </NavLink>
                    </Route>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <h1>Sign In</h1>
                <LoginFormComponent
                    setLoginStatus={this.props.setLoginStatus}
                    refreshNavbar={this.props.refreshNavbar}
                />
                <Route>
                    <NavLink
                        to="/profile"
                        activeClassName="active"
                    >Create Profile
                    </NavLink>
                </Route>
            </React.Fragment>
        )
    }
}

export default LoginComponent;