import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute"
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import Project from "./containers/Project";
import NewProject from "./containers/NewProject";
import Projects from "./containers/Projects";
import Staff from "./containers/Staff";
import NewStaff from "./containers/NewStaff";
import StaffInfo from "./containers/StaffInfo";
import Individual from "./containers/Individual";
import Pending from "./containers/Pending";
import Active from "./containers/Active";
import Completed from "./containers/Completed";
import Psearch from "./containers/Psearch";


export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
        <AuthenticatedRoute path="/Project" exact component={Project} props={childProps} />
        <AuthenticatedRoute path="/Individual" exact component={Individual} props={childProps} />
        <AuthenticatedRoute path="/Projects/new" exact component={NewProject} props={childProps} />
        <AuthenticatedRoute path="/Projects/:id" exact component={Projects} props={childProps} />
        <AuthenticatedRoute path="/User" exact component={Staff} props={childProps} />
        <AuthenticatedRoute path="/User/new" exact component={NewStaff} props={childProps} />
        <AuthenticatedRoute path="/User/:id" exact component={StaffInfo} props={childProps} />
        <AuthenticatedRoute path="/Pending" exact component={Pending} props={childProps} />
        <AuthenticatedRoute path="/Active" exact component={Active} props={childProps} />
        <AuthenticatedRoute path="/Completed" exact component={Completed} props={childProps} />
        <AuthenticatedRoute path="/Psearch" exact component={Psearch} props={childProps} />
        { /* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
    </Switch>;