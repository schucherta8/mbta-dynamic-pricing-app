import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeComponent from './components/HomePage/HomeComponent';
import SignUpLoginComponent from './components/SignUpLoginComponent';
import ProfileComponent from "./components/ProfileComponent";
import {Container} from "react-bootstrap";
import NavigationComponent from './components/NavigationComponent';
import TransactionComponent from "./components/Transaction/TransactionComponent";
import UsersComponent from "./components/User/UsersComponent";
import StationsComponent from "./components/Station/StationsComponent";
import TicketComponent from "./components/Ticket/TicketComponent";
import AdminTicketComponent from "./components/Ticket/AdminTicketComponent";
import AdminTransactionComponent from "./components/Transaction/AdminTransactionComponent";
import InformationPersonComponent from "./components/InformationPersonComponent";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: 'false',
            username: '',
            password: '',
            userType: 'Guest'
        }
    }

    handleLoginStatus = status => {
        sessionStorage.setItem('loginStatus',status);
        this.setState({isLoggedIn: sessionStorage.getItem('loginStatus')});
    };
    handleLoginRefresh = () => {
      this.setState(this.state)
    };
    //ComponentMount and Update
    componentDidMount() {
        if(sessionStorage.getItem('loginStatus') === null){
            // console.log("from app.js"+this.state.isLoggedIn);
            this.setState({isLoggedIn: this.state.isLoggedIn});
            sessionStorage.setItem('loginStatus','false');
        }

        // if(sessionStorage.getItem('user') === '') {
        //     this.setState({username: sessionStorage.getItem('user')});
        // }
        this.setState({isLoggedIn: sessionStorage.getItem('loginStatus')});
    }

    render() {
        return (
            <React.Fragment>
                {console.log("from app.js"+this.state.isLoggedIn)}
                <NavigationComponent userType={this.state.userType}/>
                <Container>
                <Router>
                    <Switch>
                        <Route exact path="/" component={() =>
                            <HomeComponent isLoggedIn={this.state.isLoggedIn}
                                           username = {this.state.username}/>
                        }
                        />
                        <Route
                            path="/signIn"
                            component={() =>
                                <SignUpLoginComponent
                                    refreshNavbar={this.handleLoginRefresh}
                                    isLoggedIn={this.state.isLoggedIn}
                                    setLoginStatus={this.handleLoginStatus}
                                    userType = {this.state.userType}
                                />
                            }
                        />
                        <Route
                            path="/profile"
                            component={() =>
                                <ProfileComponent
                                    isLoggedIn={sessionStorage.getItem('loginStatus')}
                                    userType = {this.state.userType}
                                />
                            }
                        />

                        <Route
                            path="/transactions"
                            component={() =>
                                <TransactionComponent
                                    isLoggedIn={this.state.isLoggedIn}
                                    userType = {this.state.userType}
                                    username = {this.state.username}
                                />
                            }
                        />
                        <Route path={"/tickets"} component={TicketComponent}/>
                        <Route path={"/users"} component={UsersComponent}/>
                        <Route path={"/stations"} component={StationsComponent}/>
                        <Route path={"/AdminTickets"} component={AdminTicketComponent}/>
                        <Route path={"/AdminTransactions"} component={AdminTransactionComponent}/>
                        <Route path={"/information"} component={InformationPersonComponent}/>

                    </Switch>
                </Router>
                </Container>
            </React.Fragment>

        );

    }
}

export default App;

// const SignUpLoginComponent = withRouter(App)