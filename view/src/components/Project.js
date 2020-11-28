import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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
        const role = this.props.auth.user.role;
        const workList = this.state.works.map((d) => (
            <li key={d.id} className="list-group-item">
                <div>
                    <Link to={`/works/${d.id}`}>{d.name}</Link>
                </div>
            </li>
        ));
        const { name, description } = this.state.projectDetails;
        return (
            <div>
                <h1>{name}</h1>
                <p>{description}</p>
                <h2
                    style={{
                        "text-align": "center",
                    }}
                >
                    List of works
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
                <ul className="list-group">{workList}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Project);
