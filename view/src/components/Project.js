import React, { Component } from "react";
import axios from "axios";

class Project extends Component {
    constructor() {
        super();
        this.state = {
            projectDetails: {},
            works: [],
        };
    }

    componentDidMount() {
        var a = this.props.match.params.id;
        axios
            .get("/api/getProjectById/" + a)
            .then((res) => {
                axios
                    .get("/api/getWorksByProjectId/" + a)
                    .then((res1) => {
                        this.setState({
                            works: res1.data,
                            projectDetails: res.data,
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
        const workList = this.state.works.map((d) => (
            <li key={d.id}>
                <div>{d.name}</div>
            </li>
        ));
        const { name, description } = this.state.projectDetails;
        return (
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <div>{workList}</div>
            </div>
        );
    }
}

export default Project;
