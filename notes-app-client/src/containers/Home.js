import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Home extends Component {
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
        return API.get("projects", "/projects");//notes is the API name,/notes is path
    }

    renderProjectList(projects) {
       return [{}].concat(projects).map( (project, i) =>i !== 0
                   ? <LinkContainer
                       key={project.projectName}
                       to={`/notes/${project.projectId}`}
                   >
                       <ListGroupItem header={projects.requirements}>
                       </ListGroupItem>
                    </LinkContainer>
                    : <LinkContainer
                        key="new"
                        to="/notes/new"
                    >
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
      <div className="lander">
        <h1>Project Management System</h1>
      </div>
    );
  }

    renderProjects() {
    return (
      <div className="projects">
        <PageHeader>Internal System</PageHeader>
        <ListGroup>
                {!this.state.isLoading && this.renderProjectList(this.state.projects)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
            {this.props.isAuthenticated ? this.renderProjects() : this.renderLander()}
      </div>
    );
  }
}