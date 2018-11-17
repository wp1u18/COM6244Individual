import React, { Component } from "react";
import { ListGroup, ListGroupItem, Breadcrumb } from "react-bootstrap";
import "./Project.css";
import { API } from "aws-amplify";
import { LinkContainer} from "react-router-bootstrap";

export default class Project extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            psearcher: [],
            projectName: "",
            requirements: "",
            pstatus: ""
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const projects = await this.projects();
            this.setState({ projects });
        } catch (e) {
            alert(e);
        }
    }

    projects() {
        return API.get("projects", "/projects");// projects is the API name,/ projects is path      
    }


    validateForm() {
        return this.state.Birthdate.length > 0 && this.state.Email.length > 0 && this.state.Gender.length > 0 && this.state.Skills.length > 0 && this.state.StaffName.length > 0 && this.state.StaffIdentity.length > 0;
    }



    renderProjectList(projects) {
       return [{}].concat(projects).map( (project, i) =>i !== 0

           ?<LinkContainer key={project.projectId} to={`/Projects/${project.projectId}`}>

               <ListGroupItem header={project.projectName}>

                   {"Project status:    " + project.pstatus}

               </ListGroupItem>

           </LinkContainer>

           :<LinkContainer key="new" to="/Projects/new">

               <ListGroupItem>

                   <h4>
                            
                       Create a new project

                   </h4>

               </ListGroupItem>

               </LinkContainer>
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
        <div className="project">
            <Breadcrumb><LinkContainer to="/">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
                <Breadcrumb.Item active>Projects Management</Breadcrumb.Item> 
            </Breadcrumb>
            <Breadcrumb>
                <LinkContainer key="Pending" to="/Pending">
                    <Breadcrumb.Item >View Pending Paojects</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer key="Active" to="/Active">
                    <Breadcrumb.Item>View Active Projects</Breadcrumb.Item> 
                </LinkContainer>
                <LinkContainer key="Completed" to="/Completed">
                <Breadcrumb.Item>View Completed Projects</Breadcrumb.Item> 
                </LinkContainer>
                <LinkContainer key="Psearch" to="/Psearch">
                    <Breadcrumb.Item>Search Projects</Breadcrumb.Item>
                </LinkContainer>
            </Breadcrumb>
        <ListGroup>
                {this.renderProjectList(this.state.projects)}
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