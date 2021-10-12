import React, {Component} from 'react';
import {Modal, Button, Table} from "react-bootstrap";

class ShowStationInfo extends Component {

    render() {
        console.log("prop1s"+this.props);
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Station Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Station Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <td>{this.props.station._id}</td>
                            <td>{this.props.station.name}</td>
                            <td>{this.props.station.latitude}</td>
                            <td>{this.props.station.longitude}</td>
                        </tr>


                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ShowStationInfo;