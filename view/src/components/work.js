import React, { Component } from "react";
import axios from "axios";

class Work extends Component {
    constructor() {
        super();
        this.state = {
            workDetails: {},
        };
    }

    componentDidMount() {
        var a = this.props.match.params.id;
        axios
            .get("/api/getWorkById/" + a)
            .then((res) => {
                this.setState({
                    workDetails: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
        //console.log(this.props.match.param.id);
    }

    render() {
        const { name, description } = this.state.workDetails;
        return (
            <div>
                <h1>{name}</h1>
                <div>{description}</div>
            </div>
        );
    }
}

export default Work;
