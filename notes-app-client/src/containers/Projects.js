import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Projects.css";


export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
              isLoading: null,
              isDeleting: null,
              project:null,
              projectName: "",
              requirements: "",
              pstatus:"",
          };
      }

    async componentDidMount() {
        try {
            const project = await this.getProject();
            const { requirements, pstatus, projectName } = project;
            console.log(project)
            this.setState({
                project,
                projectName,
                requirements,
                pstatus
          });
        } catch (e) {
          alert(e);
        }
                                }

    getProject() {
        return API.get("projects", `/projects/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.requirements.length > 0 && this.state.projectName.length > 0 && this.state.pstatus.length>0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    saveProject(projects) {
        return API.put("projects", `/projects/${this.props.match.params.id}`, {
            body: projects
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {       
            await this.saveProject({
                requirements: this.state.requirements,
                projectName: this.state.projectName,
                pstatus: this.state.pstatus,
            });
            this.props.history.push("/Project");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }
    

    deleteProject() {
        return API.del("projects", `/projects/${this.props.match.params.id}`);
    }

    handleDelete = async event => {
        event.preventDefault();
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );
        if (!confirmed) {
            return;
        }
        this.setState({ isDeleting: true });
        try {
            await this.deleteProject();
            this.props.history.push("/Project");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    }

    render() {
        return (
            <div className="Projects">
                <Breadcrumb id="bread">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/Project">Projects Management</Breadcrumb.Item>
                    <Breadcrumb.Item active>Project Information</Breadcrumb.Item>
                </Breadcrumb >
                {this.state.project &&
                    <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="projectName">
                            <label>Project Name:</label>
                            <FormControl
                            onChange={this.handleChange}
                            value={this.state.projectName}                           
                            />
                    </FormGroup>
                    <FormGroup controlId="pstatus">
                        <label>Project Status:</label>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} value={this.state.pstatus}>
                            <option>select</option>
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Compeleted">Compeleted</option>
                         </FormControl>
                    </FormGroup>
                    <FormGroup controlId="requirements">
                        <label>Project Requirements:</label>
                        <FormControl onChange={this.handleChange} value={this.state.requirements} componentClass="textarea"/>                              
                    </FormGroup>
                        <LoaderButton
                            block
                            bsStyle="primary"
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                            isLoading={this.state.isLoading}
                            text="Save"
                            loadingText="Saving¡­"
                        />
                        <LoaderButton
                            block
                            bsStyle="danger"
                            bsSize="large"
                            isLoading={this.state.isDeleting}
                            onClick={this.handleDelete}
                            text="Delete"
                            loadingText="Deleting¡­"
                        />
                    </form>}
            </div>
        );
    }
}