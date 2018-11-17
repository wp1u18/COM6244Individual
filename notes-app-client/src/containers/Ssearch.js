import React, { Component } from "react";
import { ListGroup, ListGroupItem, Breadcrumb, Button, FormGroup, InputGroup, FormControl, Form } from "react-bootstrap";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Ssearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
            result: null,
            projectName: ""
        };
    }

    projects(content) {
        return API.get("User", "/sSearch", {
            body: content
        });// projects is the API name,/ projects is path      
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {
            const content = this.state.projectName;
            console.log(content);
            await this.projects({
                content: this.state.projectName,
            });
            console.log(11);
        } catch (e) {
            alert(e.message);
        }
    }

    renderProjectList(content) {
        return [{}].concat(content).map((projects, i) => i !== 0

            ? <LinkContainer key={projects.projectId} to={`/Projects/${projects.projectId}`}>

                <ListGroupItem header={projects.projectName}>

                    {"Project status:    " + projects.pstatus}

                </ListGroupItem>

            </LinkContainer>

            : <div></div>
        );
    }


    renderLander() {
        return (
            <div>
                <h1>Error</h1>
            </div>
        );
    }

    renderProjects() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Projects Management</Breadcrumb.Item>
                </Breadcrumb>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup bsSize="large" controlId="projectName">
                        <InputGroup>
                            <InputGroup.Button>
                                <Button bsSize="large" type="submit">Search projects</Button>
                            </InputGroup.Button>
                            <FormControl type="text" onChange={this.handleChange} value={this.state.projectName} />
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? this.renderProjects() : this.renderLander()}
            </div>
        );
    }
}