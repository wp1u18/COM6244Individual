import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Projects.css";


export default class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
              isLoading: null,
              isDeleting: null,
              project: null,
              requirements: ""
          };
      }

    async componentDidMount() {
        try {
            const project = await this.getProject();
            const { requirements } = project;

            this.setState({
                project,
                requirements
          });
        } catch (e) {
          alert(e);
        }
                                }

    getProject() {
        console.log(this.props.match.params.id)
        return API.get("projects", `/projects/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.requirements.length > 0;
    }

    formatFilename(str) {
        return str.replace(/^\w+-/, "");
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
            });
            this.props.history.push("/");
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
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    }

    render() {
        return (
            <div className="Projects">
                {this.state.project &&
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="content">
                            <FormControl
                            onChange={this.handleChange}
                            value={this.state.requirements}
                            componentClass="textarea"
                            />
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