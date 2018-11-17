import React, { Component } from "react";
import {ListGroup, ListGroupItem,Breadcrumb } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            isDeleting: null,
        };
    }

    projects() {
        return API.get("projects", "/projects");// projects is the API name,/projects is path
    }

    staffs() {
        return API.get("User", "/User");// User is the API name,/User is path
    }

renderFunctions() {
    return (
        <div className="Home">
            <Breadcrumb>
                <Breadcrumb.Item to="/">Home</Breadcrumb.Item>            
            </Breadcrumb>
            <ListGroup>
                <LinkContainer to="/Project">   
                        <ListGroupItem>Projects Management</ListGroupItem>         
                </LinkContainer>
                <LinkContainer to="/User">                        
                        <ListGroupItem>Staffs Management</ListGroupItem>                 
                </LinkContainer>
            </ListGroup>           
        </div>
    );
}

renderLander() {
    return (
        <div>
           Please log in firstly
        </div>
    );
}

render() {
    return (
        <div className="Home">
            {this.props.isAuthenticated ? this.renderFunctions() : this.renderLander()}
        </div>
    );
}
}
