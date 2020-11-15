import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";
import axios from "axios";
import Login from "./components/Login";
import Students from "./components/Students";
import Profile from "./components/Profile";
import Project from './components/Project';
import Work from "./components/work";
import ProjectForm from "./components/ProjectForm";
import WorkForm from "./components/WorkForm";
import AssignForm from "./components/AssignForm";
import Home from "./components/Home";
import Navbar from './components/Navbar';

axios.defaults.baseURL = "http://localhost:8000";

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Navbar />
                        {/* <Route exact path="/" component={Home} /> */}
                        <div className="container">
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/home"
                                component={Home}
                            />
                            <Route
                                exact
                                path="/students"
                                component={Students}
                            />
                            <Route
                                exact
                                path="/students/:id"
                                component={Profile}
                            />
                            <Route
                                exact
                                path="/projects/:id"
                                component={Project}
                            />
                            <Route
                                exact
                                path="/works/:id"
                                component={Work}
                            />
                            <Route
                                exact
                                path="/projects/:studentId/add"
                                component={ProjectForm}
                            />
                            <Route
                                exact
                                path="/works/:projectId/add"
                                component={WorkForm}
                            />
                            <Route
                                exact
                                path="/assign/:studentId"
                                component={AssignForm}
                            />
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
