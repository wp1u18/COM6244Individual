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
            projects: [],
            staffs: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const projects = await this.projects();
            const staffs = await this.staffs();
            this.setState({ projects,staffs });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }


    projects() {
        return API.get("projects", "/projects");// projects is the API name,/projects is path
    }

    staffs() {
        return API.get("User", "/User");// User is the API name,/User is path
    }

    renderFunctions(projects,staffs) {
        return (
            <div className="Home">
                <Breadcrumb>
                    <Breadcrumb.Item to="/">Home</Breadcrumb.Item>            
                </Breadcrumb>
                <ListGroup>
                    <LinkContainer to="/Project">
                        <ListGroupItem header="Projects Management">{"Current Projects Number:  " +  this.state.projects.length}</ListGroupItem>         
                    </LinkContainer>
                    <LinkContainer to="/User">                        
                        <ListGroupItem header="Staffs Management">{"Current Staffs Number:  " + this.state.staffs.length}</ListGroupItem>                 
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
                {this.props.isAuthenticated ? this.renderFunctions(this.state.staffs, this.state.projects) : this.renderLander()}
            </div>
        );
    }
}