import React, { Component } from "react";
import { withRouter } from "react-router";
import classnames from "classnames";
import axios from "axios";

class WorkForm extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const work = {
            name: this.state.name,
            description: this.state.description,
        };
        axios
            .post("/api/addWork/" + this.props.match.params.projectId, work)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        this.props.history.push("/home");
    }

    render() {
        return (
            <div
                className="container"
                style={{ marginTop: "50px", width: "700px" }}
            >
                <h2 style={{ marginBottom: "40px" }}>Add work</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="string"
                            placeholder="Work name"
                            className={classnames(
                                "form-control form-control-lg"
                            )}
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="string"
                            placeholder="Work description"
                            className={classnames(
                                "form-control form-control-lg"
                            )}
                            name="description"
                            onChange={this.handleInputChange}
                            value={this.state.description}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Add work
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(WorkForm);
