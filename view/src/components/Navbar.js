import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";

class Navbar extends Component {
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        return (
            <div>
                <nav
                    className="navbar navbar-expand-lg bg-primary"
                    style={{ "left": "0px" }}
                >
                    <a className="navbar-brand" href="#">
                        Project Allocator
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/home">
                                    Home <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href=""
                                    className="nav-link"
                                    onClick={this.onLogout.bind(this)}
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
