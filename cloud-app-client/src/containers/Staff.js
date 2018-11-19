import React, { Component } from "react";
import { ListGroup, ListGroupItem, Breadcrumb, ButtonToolbar, Button } from "react-bootstrap";
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
        return API.get("User", "/User");//Retrieve all staffs info menthod
                                        //User is the API name, /User is path
    }

    renderProjectList(staffs) {
        return [{}].concat(staffs).map((staff, i) => i !== 0                              //list staffs info with name and skills
            ? <LinkContainer key={staff.StaffId} to={`/User/${staff.StaffId}`}>
                <ListGroupItem header={staff.StaffName}>
                    {"Skills:    " + staff.Skills}
                </ListGroupItem>
            </LinkContainer> 
            :
            <LinkContainer key="new" to="/User/new">                                         
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
                    <LinkContainer to="/">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>Staffs Management</Breadcrumb.Item>
                    <LinkContainer to="Ssearch">
                        <Breadcrumb.Item >Search Staffs</Breadcrumb.Item>
                    </LinkContainer>                        
            </Breadcrumb >
                <ListGroup>
                    {!this.state.isLoading && this.renderProjectList(this.state.staffs)}
                </ListGroup>
                <ButtonToolbar>
                    <LinkContainer to="User/Allocation">
                        <Button bsStyle="primary" >Staffs Allocation</Button>
                    </LinkContainer>
                </ButtonToolbar>;
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? this.renderProjects() : this.renderLander()}
            </div>        //check authentication status then calling render method
        );
    }
}