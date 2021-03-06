import React, { Component } from "react";
import { ListGroup, ListGroupItem, Breadcrumb } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

//view active projects interface
export default class Active extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pprojects: []
        };                                   
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;                              //Login authentication
        }

        try {
            const pprojects = await this.pprojects();    //Using await approach to waite result of calling API method and store the result in pprojects 
            this.setState({ pprojects });          //Updating state of pprojects
        } catch (e) {
            alert(e);
        }     
    }

    pprojects() {
        return API.get("projects", "/Active");//Define pproject function to call API
    }

    renderPprojects(pprojects) {
        return [{}].concat(pprojects).map((pproject, i) => i !== 0  //define a new array from pprojects and traversing the array 
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
                    <Breadcrumb.Item active>Active Projects</Breadcrumb.Item>
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