import React, {Component} from "react";
import SignUpFormComponent from "./SignUpFormComponent";
import EditProfileComponent from "./EditProfileComponent";

class ProfileComponent extends Component {
    render() {
        if(this.props.isLoggedIn === 'true'){
            return(
                <React.Fragment>
                    <h1>User Profile</h1>
                    <EditProfileComponent/>
                </React.Fragment>
            );
        }
        return(
            <React.Fragment>
                <h1> Sign Up </h1>
                <p>You do not have a profile. Please sign up in order to purchase a ticket.</p>
                <SignUpFormComponent/>
            </React.Fragment>
        );
    }
}

export default ProfileComponent;