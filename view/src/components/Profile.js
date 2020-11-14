import React, { Component } from "react";
import axios from "axios";

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
            <li key={d.id}>{d.name} </li>
        ));
        const { name } = this.state.studentDetails;
        return (
            <div>
                <h1>{name}</h1>
                <div>{projectsList}</div>
            </div>
        );
    }
}

export default Profile;
