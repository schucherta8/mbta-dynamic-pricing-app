import React, {Component}  from 'react';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";


class StationUpdateDialog extends Component {

    constructor(props) {
        super(props);
        this.state ={
            _id: this.props.id,
            name: this.props.name,
            latitude: this.props.latitude,
            longitude: this.props.longitude
        }
    }

    handleInput = event => {
        this.setState({[event.target.name] : event.target.value});
    };

    handleSubmit = e => {
        console.log(this.state)
        axios.put('/api/stations/update', this.state)
            .then(res => console.log(res));
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="formPlainTextName">
                    <Form.Label column sm={"3"}>
                        Station Name
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name = "name"
                        placeholder={"Enter station name"}
                        style={{width: '70%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridLatitude"}>
                    <Form.Label column sm={"3"}>
                        Latitude
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name = "latitude"
                        placeholder={"Enter Latitude"}
                        style={{width: '70%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Form.Group as={Row} controlId={"formGridLongitude"}>
                    <Form.Label column sm={"3"}>
                        Longitude
                    </Form.Label>
                    <Form.Control
                        type={"input"}
                        name = "longitude"
                        placeholder={"Enter Longitude"}
                        style={{width: '70%'}}
                        onChange={this.handleInput}
                    />
                </Form.Group>
                <Button variant ="success" type="submit">
                    Update
                </Button>
            </Form>
        );
    }
}

export default StationUpdateDialog;