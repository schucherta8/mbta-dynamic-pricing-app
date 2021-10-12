import React  from "react";
import LoginComponent from "./LoginComponent";

class SignUpLoginComponent extends React.Component {
    //This class may not be needed after moving some code around
    render() {
        return (
            <div>
                <LoginComponent
                    isLoggedIn = {this.props.isLoggedIn}
                    setLoginStatus = {this.props.setLoginStatus}
                    refreshNavbar={this.props.refreshNavbar}
                />
            </div>
        );
    }
}

export default SignUpLoginComponent;