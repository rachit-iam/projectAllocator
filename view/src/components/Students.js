import React, { Component } from "react";
import axios from "axios";

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
        const listItems = this.state.students.map((d) => (
            <li key={d.id}>{d.name}</li>
        ));
        return <div>{listItems}</div>;
    }
}

export default Students;
