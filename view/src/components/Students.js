import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
            <li key={d.id}>
                <div>
                    <Link to={`/students/${d.id}`}><h2>{d.name}</h2></Link>
                    {role == "dean" && 
                        <Link to={`/assign/${d.id}`}>Assign Faculty</Link>
                    }
                    {role == "faculty" && 
                        <Link to={`/projects/${d.id}/add`}>Add Project</Link>
                    }
                    <hr/>
                </div>
            </li>
        ));

        return (
            <div>
            <h1>List of Students</h1>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export  default connect(mapStateToProps)(Students)
