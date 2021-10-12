import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {Dropdown, DropdownItem, Card, Alert} from "react-bootstrap";
import ticketImage from '../../images/ticket.jpg';
import styled from "styled-components";
import ShowStationInfo from "./ShowStationInfo";


const Styles = styled.div`
.cardInCenter {
  align-items: center;
  justify-content: center;
  display: flex;
  }`;

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {
            stations: [],
            sourceSuggestions: [],
            destinationSuggestions: [],
            sourceText: '',
            destinationText: '',
            displayTicket: false,
            ticketPrice: 0,
            distance: 0,
            showAlert: false,
            username: this.props.username,
            isSourceStationClicked: false,
            sourceStationName: [],
            isDestinationStationClicked: false,
            destinationStationName: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({username: sessionStorage.getItem('user')});
        axios.get('/api/stations')
            .then(response => {
                response.data.map(station => {
                    if (this._isMounted) {
                        this.setState(prevState => ({
                            stations: [...prevState.stations, station.name]
                        }))
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    changeSourceInputHandler = (event) => {
        const value = event.target.value;
        let filteredStations = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            filteredStations = this.state.stations.sort().filter(value => regex.test(value));
        }
        this.setState({sourceSuggestions: filteredStations, sourceText: value});
    };


    changeDestinationInputHandler = (event) => {
        const value = event.target.value;
        let filteredStations = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            filteredStations = this.state.stations.sort().filter(value => regex.test(value));
        }
        this.setState({destinationSuggestions: filteredStations, destinationText: value});
    };

    suggestionSelected(item, stationType) {
        if (stationType === 'source') {
            this.setState(() => ({
                sourceText: item,
                sourceSuggestions: []
            }))
        } else {
            this.setState(() => ({
                destinationText: item,
                destinationSuggestions: []
            }))
        }

    }


    renderAlert() {
        return (<Alert variant='danger'>
            <b>The user is not logged in!!!</b>
        </Alert>)
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        if (this.props.isLoggedIn === 'false') {
            this.setState({showAlert: true});
            return;
        }
        axios.post("/api/createTransaction", {
            sourceStation: this.state.sourceText,
            destinationStation: this.state.destinationText,
            username: this.state.username
        }).then(response => {
            axios.get('/api/ticket/' + response.data[0].ticket)
                .then((res) => {
                    this.setState({
                        distance: res.data.distance,
                        ticketPrice: res.data.price
                    })
                })
                .then(() => this.setState({displayTicket: true}))
                .catch(error => {
                    console.log(error);
                })
        }).catch(error => {
            console.log(error);
        })
    };

    stationInfo (stationName, i, stationType) {
        console.log("Item", stationName);
        console.log("index", i);
        axios.get('/api/stationsInfo/'+stationName.item)
            .then((station =>  {
                if(stationType === "Source") {
                    this.setState({sourceStationName: station.data});
                    this.setState({isSourceStationClicked : true});
                } else {
                    this.setState({destinationStationName: station.data});
                    this.setState({isDestinationStationClicked : true});
                }
            }))
            .catch(error => {
                console.log(error);
            });

    };


    renderSuggestions(stationType) {
        let i = 0;
        if (stationType === "source") {
            const {sourceSuggestions} = this.state;
            if (sourceSuggestions.length === 0) {
                return null;
            }
            return (
                <Dropdown>
                    {sourceSuggestions.map((item,i) =>
                        <DropdownItem id = {i++} className="item" key={item}
                                      onClick={() => this.suggestionSelected(item, stationType)}>
                            {item}
                            <p align="right">
                                <Button onClick = {() => this.stationInfo({item}, i, "Source")}>
                                    Station Info
                                </Button>
                            </p>

                        </DropdownItem>)
                    }
                </Dropdown>
            );
        } else {
            const {destinationSuggestions} = this.state;
            if (destinationSuggestions.length === 0) {
                return null;
            }
            return (
                <Dropdown>
                    {destinationSuggestions.map(item =>
                        <DropdownItem className="item" key={item}
                                    onClick={() => this.suggestionSelected(item, stationType)}>
                            {item}
                            <p align="right">
                                <Button onClick = {() => this.stationInfo({item}, i, "Destination")}>
                                    Station Info
                                </Button>
                            </p>
                        </DropdownItem>)}
                </Dropdown>
            );
        }

    }


    render() {
        const {sourceText, destinationText} = this.state;
        let setSourceToFalse = () => this.setState({isSourceStationClicked : false});
        let setDestinationToFalse = () => this.setState({isDestinationStationClicked : false});
        return (
            <React.Fragment>
                <h1> Home</h1>
                {this.state.showAlert && this.renderAlert()}
                <Form onSubmit={(event) => this.onSubmitHandler(event)}>
                    <Form.Group controlId="formSource">
                        <Form.Label>Source Station</Form.Label>
                        <div className="search">
                            <div className="search-container">
                                <Form.Control value={sourceText} type="input" placeholder="Enter Source Station"
                                              onChange={this.changeSourceInputHandler}/>
                                {this.renderSuggestions("source")}
                                <ShowStationInfo show = {this.state.isSourceStationClicked}
                                                 station = {this.state.sourceStationName}
                                                 onHide = {setSourceToFalse}/>
                            </div>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formSource">
                        <Form.Label>Destination Station</Form.Label>
                        <Form.Control value={destinationText} type="input" placeholder="Enter Destination Station"
                                      onChange={this.changeDestinationInputHandler}/>
                        {this.renderSuggestions("destination")}
                        <ShowStationInfo show = {this.state.isDestinationStationClicked}
                                         station = {this.state.destinationStationName}
                                         onHide = {setDestinationToFalse}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Buy Ticket
                    </Button>
                    <Styles>
                        <div className='cardInCenter'>
                            {this.state.displayTicket ? (

                                <Card className='text-center' bg="success" text="white" style={{width: '18rem'}}>
                                    <Card.Img variant="top" src={ticketImage}/>
                                    <Card.Header>Congratulations!</Card.Header>
                                    <Card.Body>
                                        <Card.Title> You just bought your ticket!</Card.Title>
                                        <Card.Text>
                                            <b>Source: </b>{this.state.sourceText} <br/>
                                            <b> Destination:</b> {this.state.destinationText} <br/>
                                            <b> Distance is : </b> {this.state.distance} miles<br/>
                                            <b>Ticket Price is :</b> {this.state.ticketPrice} $
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            ) : null}
                        </div>
                    </Styles>
                </Form>

            </React.Fragment>

        );

    }
}

export default HomeComponent;