//todo : Add min date and from server

import React, { Component } from "react";

import { FormGroup, Label, Input, FormText } from "reactstrap";

import { Card, CardHeader, CardBody } from "reactstrap";

import { Button } from "reactstrap";
import axios from "axios";

class AdminTestSchedule extends Component {
    state = {
        time: {},
        date: {},
        file: null,
        testType: 0,
    };

    TimeOnChangeHandler = (event) => {
        this.setState({ time: event.target.value });
    };

    scheduleHandler = () => {
        //TODO:- Else Post to server
        const data = new FormData();
        console.log(this.state.file);
        data.append("excelFile", this.state.file);
        data.append("time", this.state.time);
        console.log(data);
        if (this.state.testType == "0") {
            axios
                .post("http://localhost:3001/createSession", data, {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                    const statusCode = e.response.status;
                    const err = e.response.data;
                    if (err != undefined && err != null) {
                        alert(err);
                        if (statusCode == 401) {
                            // localStorage.clear();
                            // this.props.history.replace("login");
                        }
                    }
                });
        } else if (this.state.testType == "1") {
            axios
                .post("http://localhost:3001/createCodeSession", data, {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    console.log("success");
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    FileUploadHandler = (event) => {
        let file = event.target.files[0];
        let ext = "";
        if (file !== undefined) ext = file.name.split(".");

        if (file.size > 5000000 || ext[1] !== "xlsx") {
            alert("Invalid File");
        } else {
            file = event.target.files[0];
            console.log(file);
            this.setState({ file: file }, () => {
                console.log(this.state);
            });
        }
        // let reader = new FileReader()
    };

    testTypeHandler = (event) => {
        this.setState({ testType: event.target.value }, () => {
            console.log(this.state);
        });
    };

    render() {
        return (
            <Card style={{ margin: "20px", padding: "2px" }}>
                <CardHeader>Schedule Test</CardHeader>
                <CardBody>
                    <form>
                        <FormGroup>
                            <Label className="form-check-label">
                                <Input
                                    type="radio"
                                    name="type"
                                    id="1"
                                    value="0"
                                    onChange={(event) =>
                                        this.testTypeHandler(event)
                                    }
                                    defaultChecked
                                />
                                QUIZ
                                <span className="form-check-sign"></span>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label className="form-check-label">
                                <Input
                                    type="radio"
                                    name="type"
                                    id="2"
                                    value="1"
                                    onChange={(event) =>
                                        this.testTypeHandler(event)
                                    }
                                />
                                CODE
                                <span className="form-check-sign"></span>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for="time">Enter Test Time in Seconds</Label>
                            <Input
                                type="number"
                                name="time"
                                id="time"
                                placeholder="Enter Time"
                                onChange={(event) =>
                                    this.TimeOnChangeHandler(event)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="file">Upload File</Label>
                            <Input
                                type="file"
                                name="file"
                                id="file"
                                onChange={(event) =>
                                    this.FileUploadHandler(event)
                                }
                            />
                        </FormGroup>
                        <Button color="primary" onClick={this.scheduleHandler}>
                            Schedule Test
                        </Button>
                    </form>
                </CardBody>
            </Card>
        );
    }
}

export default AdminTestSchedule;
