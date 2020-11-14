import React, { Component } from "react";
import axios from "axios";

class AssignForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 0,
            faculties: [],
        };
    }

    componentDidMount() {
        axios
            .get("/api/getAllFaculty")
            .then((res) => {
                this.setState({
                    faculties: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: parseInt(changeEvent.target.value),
        });
    };

    handleFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        axios
            .post("/api/assignFaculty/" + this.props.match.params.studentId, {
                facultyId: this.state.selectedOption,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const radioItems = this.state.faculties.map((fac) => (
            <div className="form-check" key={fac.id}>
                <label>
                    <input
                        type="radio"
                        name="react-tips"
                        value={fac.id}
                        checked={this.state.selectedOption === fac.id}
                        onChange={this.handleOptionChange}
                        className="form-check-input"
                    />
                    {fac.name}
                </label>
            </div>
        ));
        return (
            <div className="container">
                <form onSubmit={this.handleFormSubmit}>
                    {radioItems}
                    <div className="form-group">
                        <button className="btn btn-primary mt-2" type="submit">
                            Assign
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AssignForm;
