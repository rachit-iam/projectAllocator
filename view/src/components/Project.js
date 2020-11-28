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
            <div key={d.id} className="card">
                <div className="card-body">
                    <span style={{ fontSize: "25px" }}>{d.name}</span>
                    <Link to={`/works/${d.id}`}>
                        <span
                            className="btn btn-info"
                            style={{ float: "right", marginLeft: "10px" }}
                        >
                            See Work Details
                        </span>
                    </Link>
                </div>
            </div>
        ));
        const { name, description } = this.state.projectDetails;
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        Project Details
                    </div>
                    <div className="card-body" style={{paddingTop:"0px"}}>
                        <h1>{name}</h1>
                        <p className="lead mt-4">{description}</p>
                    </div>
                </div>
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
                <div>{workList}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Project);
