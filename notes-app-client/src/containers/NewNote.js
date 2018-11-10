import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewProjects.css";
import { API } from "aws-amplify";

export default class NewNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            requirements: ""
        };
    }

    validateForm() {
        return this.state.requirements.length > 0;
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
            await this.createNote({
                requirements: this.state.requirements
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    createNote(projects) {
        return API.post("projects", "/projects", {
            body: projects
        });
    }

    render() {
        return (
            <div className="NewProjects">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="requirements">
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
                        text="Create"
                        loadingText="Creating¡­"
                    />
                </form>
            </div>
        );
    }
}