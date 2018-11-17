import React, { Component } from "react";
import { ListGroup, ListGroupItem, Breadcrumb, Button, FormGroup, InputGroup, FormControl, Form } from "react-bootstrap";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Psearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,   
            projectName: ""
        };
    }
    //projects(content) {
    //    console.log(content);
    //    return API.get("projects", "/projects/pSearch", {
    //        body: "content"
    //    });
    //}// projects is the API name,/ projects is path 
    //    };
    //projects(content) {
    //    console.log(11);
    //    let myinit = {
    //        headers: {},
    //        response: true,
    //        body: {
    //            content: "a"
    //        }
    //    }
     //          return API.get("pSearch", "/pSearch", myinit)
     //              "body": content
     //                       });     

    async projects() {
        let myInit = { // OPTIONAL
            body: {
                content:"e"
            } // OPTIONAL
        }
        return await API.get("projects", "pSearch", myInit);
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {
            console.log(this.state.projectName);
            this.projects();
            console.log(11111);
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