import React, { Component } from "react";
import { ListGroup, ListGroupItem, Breadcrumb } from "react-bootstrap";
import "./Project.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      projects: []
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

        this.setState({ isLoading: false });
    }

  projects() {
      return API.get("projects", "/projects");// projects is the API name,/ projects is path      
    }

  renderProjectList(projects) {
       return [{}].concat(projects).map( (project, i) =>i !== 0

           ?<LinkContainer key={project.projectId} to={`/Projects/${project.projectId}`}>

               <ListGroupItem header={project.projectName}>

                   {"Project status:    " + project.pstatus}

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
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Projects Management</Breadcrumb.Item>
            </Breadcrumb>
        <ListGroup>
                {!this.state.isLoading && this.renderProjectList(this.state.projects)}
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