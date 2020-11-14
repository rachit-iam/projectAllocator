import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
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
            <li key={d.id}>
                <Link to={`/projects/${d.id}`}><h2>{d.name}</h2></Link>
                { this.props.auth.user.role === "student" &&
                    <Link to={`/works/${d.id}/add`}>Add your work</Link>
                }
                <hr/>
            </li>
        ));
        const { name, admissionNo } = this.state.studentDetails;
        return (
            <div>
                <h1>{name}</h1>
                <h2>admissionNo = {admissionNo}</h2>
                <p>
                    <h2>Project List</h2>
                    <ul>{projectsList}</ul>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Profile);

