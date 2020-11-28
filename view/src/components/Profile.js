import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            studentDetails: {},
            projects: [],
        };
    }

    componentDidMount() {
        var a = this.props.match.params.id;
        axios
            .get("/api/getStudentDetails/" + a)
            .then((res) => {
                axios
                    .get("/api/getProjectsByStudentId/" + a)
                    .then((res1) => {
                        this.setState({
                            projects: res1.data,
                            studentDetails: res.data,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
        //console.log(this.props.match.param.id);
    }

    render() {
        const projectsList = this.state.projects.map((d) => (
            <div key={d.id} className="card">
                <div className="card-body">
                    <span style={{ fontSize: "25px" }}>{d.name}</span>
                    <Link to={`/projects/${d.id}`}>
                        <span
                            className="btn btn-info"
                            style={{ float: "right", marginLeft: "10px" }}
                        >
                            See Project Details
                        </span>
                    </Link>
                    {this.props.auth.user.role === "student" && (
                        <span style={{ float: "right" }}>
                            <Link
                                className="btn btn-info"
                                to={`/works/${d.id}/add`}
                            >
                                Add your work
                            </Link>
                        </span>
                    )}
                </div>
            </div>
        ));
        const { name, admissionNo } = this.state.studentDetails;
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        Student Details
                    </div>
                    <div className="card-body" style={{paddingTop:"0px"}}>
                        <h1>Name : {name}</h1>
                        <h2>Admission number : {admissionNo}</h2>
                    </div>
                </div>
                
                <div className="card">
                    <div className="card-body">
                    <h2
                    style={{
                        "text-align": "center",
                    }}
                >
                    List of Projects
                </h2>
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
                <div>{projectsList}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
