import React, { Component} from "react";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewProject.css";
import { API } from "aws-amplify";


//create a new project
export default class NewProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            requirements: "",
            pstatus: "",
            projectName: ""
        };
    }

    validateForm() {
        return this.state.requirements.length > 0 && this.state.projectName.length > 0 && this.state.pstatus.length > 0;
    }

    createProject(projects) {
            return API.post("projects", "/projects", {
                body: projects
            });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
            await this.createProject({                           //Calling createProject method and pass data 
                requirements: this.state.requirements,
                projectName: this.state.projectName,
                pstatus: this.state.pstatus
            });
            this.props.history.push("/Project");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <div className="NewProject">
                <Breadcrumb>                   
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/Project">Projects Management</Breadcrumb.Item>
                    <Breadcrumb.Item active>New Project</Breadcrumb.Item>
                </Breadcrumb >
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="projectName">                     
                        <label>Name:</label>
                        <FormControl placeholder="Name of project" onChange={this.handleChange} value={this.state.projectName} />    
                    </FormGroup>
                    <FormGroup controlId="pstatus">
                        <label>Status:</label>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} value={this.state.pstatus}>
                            <option>select</option>
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="requirements">
                        <label>Requirement:</label>
                        <FormControl componentClass="textarea" placeholder="Project requirement" onChange={this.handleChange} value={this.state.requirements} />  
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create"
                        loadingText="Creating¡­"
                    />
                </form>
            </div>
        );
    }
}