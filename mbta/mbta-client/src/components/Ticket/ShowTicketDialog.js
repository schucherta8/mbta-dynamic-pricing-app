import React, {Component}  from 'react';
import {Modal, Button, Table} from "react-bootstrap";


class ShowTicketDialog extends Component {

    render() {
        let i = 1;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ticket Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Source StationID</th>
                            <th>Destination StationID</th>
                            <th>Distance</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr >
                                    <td>{i}</td>
                                    <td>{this.props.ticket.sourceStation}</td>
                                    <td>{this.props.ticket.destinationStation}</td>
                                    <td>{this.props.ticket.distance}</td>
                                    <td>{this.props.ticket.price}</td>
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


export default ShowTicketDialog;