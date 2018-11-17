import React, { Component } from "react";
import { ListGroup, ListGroupItem, Breadcrumb } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Completed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pprojects: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;                         //Login authentication
        }

        try {
            const pprojects = await this.pprojects();
            this.setState({ pprojects });
            console.log(111);
        } catch (e) {
            alert(e);
        }     
    }

    pprojects() {
        return API.get("projects", "/Completed");
    }

    renderPprojects(pprojects) {
        return [{}].concat(pprojects).map((pproject, i) => i !== 0
            ? <LinkContainer key={pproject.projectId} to={`/Projects/${pproject.projectId}`}>
                <ListGroupItem header={pproject.projectName}>

                    {"Project status:    " + pproject.pstatus}

                </ListGroupItem>

            </LinkContainer>
            : <LinkContainer key="new" to="/Projects/new">

                <ListGroupItem>

                    <h4>

                        Create a new project
 
                   </h4>

                </ListGroupItem>

            </LinkContainer>
        );
    }

    renderProjects() {
        return (
            <div className="project">
                <Breadcrumb>
                    <LinkContainer to="/">
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    </LinkContainer>
                    <LinkContainer to="Project">
                        <Breadcrumb.Item>Projects Management</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>Completed Projects</Breadcrumb.Item>
                </Breadcrumb>  
                <ListGroup>
                    {this.renderPprojects(this.state.pprojects)}
                </ListGroup>
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