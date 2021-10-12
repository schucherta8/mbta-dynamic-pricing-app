import React, {Component} from 'react';
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FormComponent from "../FormComponent";
import StationUpdateDialog from "./StationUpdateDialog";

class StationsComponent extends Component {

    constructor(state) {
        super(state);

        this.state = {
            stations: [],
            isPressed: false,
            viewUpdateFlag: false,
            stationupdate: {}
        };
    }

    componentDidMount() {
        axios.get('/api/stations')
            .then(response => {
                this.setState({stations: response.data})
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteEntry(station) {
        axios.delete('/api/deleteStation/' + station)
            .then(() => axios.get('/api/stations'))
            .then(station => {
                // console.log("Data: " + response.data[0])
                this.setState({stations: station.data})
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleButton = () => {
        this.setState({isPressed: true});
    };



    render() {
        return (
            <React.Fragment>
                <Button onClick={this.handleButton}>
                    Create Station
                </Button>
                {this.state.isPressed && <FormComponent componentType={'Station'}/>}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Station Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Delete Stations</th>
                            <th>Update Station</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.stations.map(station => (
                        <tr key={station._id}>
                            <td>{station._id}</td>
                            <td>{station.name}</td>
                            <td>{station.latitude}</td>
                            <td>{station.longitude}</td>
                            <td>
                                <Button variant="danger"
                                        onClick={() => this.deleteEntry(station._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                            <td>
                                <StationUpdateDialog
                                    id={station._id}
                                    name={station.name}
                                    latitude={station.latitude}
                                    longitude={station.longitude}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

export default StationsComponent;