import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth,API } from "aws-amplify";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            staff: null,
            email: "",
            password: "",
            StaffIdentity:""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    getStaff() {
        return API.get("projects", `/User/${this.props.match.params.id}`);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
            console.log(this.props.match.params.id)
            console.log("staff")
            const staff = await this.getStaff();
            console.log(staff)
            const { StaffIdentity } = staff;
            this.setState({
                StaffIdentity
            });         
            if (this.state.StaffIdentity === this.staff.StaffIdentity) {
                this.props.history.push("/ManagerHome"); }
            else if (this.state.StaffIdentity === this.staff.StaffIdentity) {
                this.props.history.push("/Project"); }
            else if (this.state.StaffIdentity === this.staff.StaffIdentity) {
                this.props.history.push("/Home");
        }
            this.props.history.push("/Project");
        } catch (e) {
            alert(e.message);
        }
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>   
                     <FormGroup controlId="StaffIdentity" bsSize="large">
                        <label>Identity:</label>
                       <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} value={this.state.StaffIdentity}>
                            <option>select</option>
                            <option value="Manager">Manager</option>
                            <option value="Staff">Staff</option>
                            <option value="Administrator">Administrator</option>
                        </FormControl>
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Login"
                        loadingText="Logging in¡­"
                    />
                </form>
            </div>
        );
    }
}