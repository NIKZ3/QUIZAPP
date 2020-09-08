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
    };

    TimeOnChangeHandler = (event) => {
        let splitTime = event.target.value.split(":");
        let time = {};
        time["hrs"] = splitTime[0];
        time["min"] = splitTime[1];

        this.setState({ time: time });
    };

    DateOnChangeHandler = (event) => {
        let splitDate = event.target.value.split("-");
        let date = {};
        date["year"] = splitDate[0];
        date["month"] = splitDate[1];
        date["date"] = splitDate[2];

        this.setState({ date: date });
    };

    scheduleHandler = () => {
        /*if (
            this.state.time.hrs === undefined ||
            this.state.date.year === undefined
        ) {
            alert("Please insert Date and Time");
        }*/
        //TODO:- Else Post to server
        const data = new FormData();
        console.log(this.state.file);
        data.append("excelFile", this.state.file);
        axios
            .post("http://localhost:3001/createSession", data, {
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
    };

    FileUploadHandler = (event) => {
        console.log("YOO");
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

    render() {
        return (
            <Card style={{ margin: "20px", padding: "2px" }}>
                <CardHeader>Schedule Test</CardHeader>
                <CardBody>
                    <form>
                        <FormGroup>
                            <Label for="time">Enter Test Time</Label>
                            <Input
                                type="time"
                                name="time"
                                id="time"
                                placeholder="Enter Time"
                                onChange={(event) =>
                                    this.TimeOnChangeHandler(event)
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">Enter Date</Label>
                            <Input
                                type="date"
                                name="date"
                                id="date"
                                placeholder="DATE"
                                onChange={(event) =>
                                    this.DateOnChangeHandler(event)
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
