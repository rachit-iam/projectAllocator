import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Students extends Component {
    constructor() {
        super();
        this.state = {
            students: [],
        };
    }

    componentDidMount() {
        axios
            .get("/api/getAllStudents")
            .then((res) => {
                this.setState({
                    students: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const role = this.props.auth.user.role;
        const listItems = this.state.students.map((d) => (
            <div class="card">
                <div className="card-body">
                    <span style={{"fontSize":"25px"}}>{d.name}</span>
                    <Link to={`/students/${d.id}`}>
                        <span className="btn btn-info" style={{ float: "right", marginLeft:"10px" }}>Go to Profile</span>
                    </Link>
                    {role == "dean" && (!d.facultyId) &&  (
                        <span style={{ float: "right" }}>
                            <Link
                                className="btn btn-info"
                                to={`/assign/${d.id}`}
                            >
                                Assign Faculty
                            </Link>
                        </span>
                    )}
                    {role == "faculty" && (
                        <span style={{ float: "right" }}>
                            <Link
                                className="btn btn-info"
                                to={`/projects/${d.id}/add`}
                            >
                                Add Project
                            </Link>
                        </span>
                    )}
                </div>
            </div>
        ));

        return (
            <div>
                <h1
                    style={{
                        "text-align": "center",
                    }}
                >
                    List of Students
                </h1>
                <hr
                    style={{
                        padding: "0",
                        overflow: "visible",
                        height: "30px",
                        "border-style": "solid",
                        "border-color": "black",
                        "border-width": "1px 0 0 0",
                    }}
                />
                <div>{listItems}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Students);
