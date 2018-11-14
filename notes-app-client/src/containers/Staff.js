import React, { Component } from "react";
import { ListGroup, ListGroupItem, Breadcrumb } from "react-bootstrap";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import "./Staff.css";


export default class Staff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            staffs: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }
        try {
            const staffs = await this.staffs();
            this.setState({ staffs });
        } catch (e) {
            alert(e);
        }
        this.setState({ isLoading: false });
    }

    staffs() {
        return API.get("User", "/User");// User is the API name,/User is path
    }

    renderProjectList(staffs) {
        return [{}].concat(staffs).map((staff, i) => i !== 0
            ? <LinkContainer key={staff.StaffId} to={`/User/${staff.StaffId}`}>
                <ListGroupItem header={staff.StaffName}>
                    {"Skills:    " + staff.Skills}
                </ListGroupItem>
               </LinkContainer>
            : <LinkContainer key="new" to="/User/new">                                         
                <ListGroupItem>
                    <h4>
                       Add a new staff
                     </h4>
                </ListGroupItem>
            </LinkContainer>
        );
    }

    renderLander() {
        return (
            <div>
                <h1>Error!</h1>
            </div>
        );
    }

    renderProjects() {
        return (
            <div className="Staffs">
                <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Staffs Management</Breadcrumb.Item>
            </Breadcrumb >
                <ListGroup>
                    {!this.state.isLoading && this.renderProjectList(this.state.staffs)}
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