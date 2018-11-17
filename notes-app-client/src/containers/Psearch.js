import React, { Component } from "react";
import { ListGroupItem, Breadcrumb, Button, FormGroup, InputGroup, FormControl, Form } from "react-bootstrap";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Psearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null, 
            result:[],
            projectName: ""
        };
    }

    projects() {
        let myInit = { 
            queryStringParameters: {
                content: this.state.projectName
            } 
        }
        return API.get("projects", "/projects/pSearch", myInit);
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {         
            const result = await this.projects();
            this.setState({ result });
            console.log(result);
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

    renderProjects(result) {
         return [{}].concat(result).map((results, i) => i !== 0

            ? <LinkContainer key={results.projectId} to={`/Projects/${results.projectId}`}>

                <ListGroupItem header={results.projectName}>

                    {"Project status:    " + results.pstatus}

                </ListGroupItem>

             </LinkContainer>
             : <div key="searching">
                 <Breadcrumb>
                     <LinkContainer to="/">
                         <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                     </LinkContainer>
                     <LinkContainer to="Project">
                         <Breadcrumb.Item>Projects Management</Breadcrumb.Item>
                     </LinkContainer>
                     <Breadcrumb.Item active>Project Searching</Breadcrumb.Item>
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
                {this.props.isAuthenticated ? this.renderProjects(this.state.result) : this.renderLander()}
            </div>
        );
    }
}