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
            <li key={d.id} className="list-group-item">
                <Link to={`/projects/${d.id}`} style={{ "font-size": "2em" }}>
                    {d.name}
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
            </li>
        ));
        const { name, admissionNo } = this.state.studentDetails;
        return (
            <div>
                <h1>{name}</h1>
                <h2>admissionNo = {admissionNo}</h2>
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
                        margin: "0px 75px 0px 75px",
                        "border-style": "solid",
                        "border-color": "black",
                        "border-width": "1px 0 0 0",
                    }}
                />
                <ul className="list-group" style={{margin:"0px 75px 0px 75px"}}>{projectsList}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
