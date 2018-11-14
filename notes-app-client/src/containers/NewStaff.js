import React, { Component } from "react";
import { FormGroup, FormControl, Breadcrumb } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewProject.css";
import { API } from "aws-amplify";

export default class NewStaff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            Birthdate: "",
            Email: "",
            Gender: "",
            Skills: "",
            StaffName: "",
            StaffIdentity: ""
        };
    }

    validateForm() {
        return this.state.Birthdate.length > 0 && this.state.Email.length > 0 && this.state.Gender.length > 0 && this.state.Skills.length > 0 && this.state.StaffName.length > 0 && this.state.StaffIdentity.length > 0;
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
            await this.AddStaff({
                Birthdate: this.state.Birthdate,
                Email: this.state.Email,
                Gender: this.state.Gender,
                Skills: this.state.Skills,
                StaffName: this.state.StaffName,
                StaffIdentity: this.state.StaffIdentity
            });
            this.props.history.push("/User");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    AddStaff(staffs) {
        return API.post("User", "/User", {
            body: staffs
        });
    }

    render() {
        return (
            <div className="NewStaff">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/User">Staffs Management</Breadcrumb.Item>
                    <Breadcrumb.Item active>Add new staff</Breadcrumb.Item>
                </Breadcrumb >
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="StaffName">                     
                        <label>Name:</label>
                        <FormControl placeholder="Name" onChange={this.handleChange} value={this.state.Name} />    
                    </FormGroup>
                    <FormGroup controlId="Gender">
                        <label>Gender:</label>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} value={this.state.Gender}>
                            <option>select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="Birthdate">
                        <label>Birthdate:</label>
                        <FormControl autoFocus type="date" onChange={this.handleChange} value={this.state.Birthdate} />
                    </FormGroup>
                    <FormGroup controlId="Email">
                        <label>Email:</label>
                        <FormControl autoFocus type="email" placeholder="admin@example.com"  onChange={this.handleChange} value={this.state.Email} />
                    </FormGroup>
                    <FormGroup controlId="Skills">
                        <label>Skills:</label>
                        <FormControl onChange={this.handleChange} value={this.state.Skills} />
                    </FormGroup>
                    <FormGroup controlId="StaffIdentity">
                        <label>Identity</label>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} value={this.state.StaffIdentity}>
                            <option>select</option>
                            <option value="Manager">Manager</option>
                            <option value="Staff">Staff</option>                          
                        </FormControl>
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