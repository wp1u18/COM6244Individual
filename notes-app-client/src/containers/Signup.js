import React, { Component } from "react";
import { Alert, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import { Auth, API } from "aws-amplify";

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            newUser: null,
            //receiver:null,
            email: "",
            password: "",
            confirmPassword: ""
           
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

  
    //email(receiver) {
    //    console.log(receiver);
    //    return API.post("Sendemail", "/email", {
    //        body: receiver
    //    });
    //    };
    

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
            
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password
            });
            this.setState({newUser });                             
            //await this.email({
            //    receiver: this.state.email,             
            //});
        } catch (e) {
            alert(e.message);
        }
        this.setState({ isLoading: false });
    }

    handleRequestSubmit = async event => {
        event.preventDefault();
        try {
            this.props.history.push("/Login");
            
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    renderRequestForm() {
        return (
            <form onSubmit={this.handleRequestSubmit}>
                <Alert bsStyle="warning">
                    Your request has been sent to administors,please waiting for confitmation
               </Alert>
                <Button type="submit">Confirm</Button>
            </form>
        );
    }

    renderForm() {
        return (
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
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <LoaderButton
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Signup"
                    loadingText="RequestingĦ­"
                />
            </form>
        );
    }

    render() {
        return (
            <div className="Signup">
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderRequestForm()}
            </div>
        );
    }
}