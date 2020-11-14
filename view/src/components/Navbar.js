import React, { Component } from "react";
import { Link , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';

class Navbar extends Component {
    
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        return (
            <div>
                <Link to="/home">Home</Link>
                <br />
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>Logout</a>
                <hr />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export  default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));