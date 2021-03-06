import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
    render() {
        var customButton;
        if (!this.props.auth.isAuthenticated) {
            customButton = <Link to="/login">Log In</Link>;
        } else {
            switch (this.props.auth.user.role) {
                case "student": {
                    customButton = (
                        <Link
                            to={`/students/${localStorage.studentId}`}
                        >
                            See you profile
                        </Link>
                    );
                    // error: only going to 2
                    break;
                }
                case "dean": {
                    customButton = <Link to="/students">See all students</Link>;
                    break;
                }
                case "faculty": {
                    customButton = (
                        <Link to="/students">See your students</Link>
                    );
                    break;
                }
                default: {
                }
            }
        }
        return <div>{customButton}</div>;
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Home);
