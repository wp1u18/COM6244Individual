import React, { Component } from "react";
import { ListGroupItem, Breadcrumb, Button, FormGroup, InputGroup, FormControl, Form } from "react-bootstrap";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

//Staff searching interface 
export default class Ssearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
            result: [],
            StaffName: ""
        };
    }

    searchStaff() {                  //searching staff method
        let myInit = {
            queryStringParameters: {
                content: this.state.StaffName
            }
        }
        return API.get("User", "/User/sSearch", myInit);
    }                            //Calling Lambda function by API


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {
            const result = await this.searchStaff(); //Calling searchstaff method 
            this.setState({ result });
            console.log(result);   //test
        } catch (e) {
            alert(e.message);
        }
    }

    renderLander() {
        return (
            <div>
                <h1>Error</h1>
            </div>
        );
    }

    renderStaffs(result) {
        return [{}].concat(result).map((results, i) => i !== 0

            ? <LinkContainer key={results.StaffId} to={`/User/${results.StaffId}`}>

                <ListGroupItem header={results.StaffName}>

                    {"Skills:    " + results.Skills}

                </ListGroupItem>

            </LinkContainer>
            : <div key="searching">
                <Breadcrumb>
                    <LinkContainer to="/">
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    </LinkContainer>
                    <LinkContainer to="User">
                        <Breadcrumb.Item>Staffs Management</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>Staffs Searching</Breadcrumb.Item>
                </Breadcrumb>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup bsSize="large" controlId="StaffName">
                        <InputGroup>
                            <InputGroup.Button>
                                <Button bsSize="large" type="submit">Search Staffs</Button>
                            </InputGroup.Button>
                            <FormControl type="text" onChange={this.handleChange} value={this.state.StaffName} />
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? this.renderStaffs(this.state.result) : this.renderLander()}
            </div>   
        );
    }
}