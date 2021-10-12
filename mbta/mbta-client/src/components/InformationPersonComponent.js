import React from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";

class InformationPersonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prices: []
        };
    }

    componentDidMount() {
        axios.get('/api/priceDistance')
            .then(response => {
                this.setState({prices: response.data})
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Distance</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.prices.map(price => (

                            <tr key={price._id}>
                                <td>{price._id}</td>
                                <td>{price.distance}</td>
                                <td>{price.price}</td>
                            </tr>)
                        )
                    }
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}
export default InformationPersonComponent;