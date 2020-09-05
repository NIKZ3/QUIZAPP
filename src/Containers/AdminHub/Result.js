import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { Button } from "reactstrap";

class Result extends Component {
    state = {
        result: [
            { user: "ngawade911@gmail.com", score: 100 },
            { user: "ngawade911@gmail.com", score: 100 },
        ],
    };

    // TODO : Axios request to import result of particular result
    componentDidMount() {}

    render() {
        let result = [];
        for (let i = 0; i < this.state.result.length; i++) {
            result.push(
                <Card>
                    <CardBody>
                        <CardTitle>{this.state.result[i].user}</CardTitle>
                        <CardText>{this.state.result[i].score}</CardText>
                    </CardBody>
                </Card>
            );
        }

        return <div style={{ margin: "75px" }}>{result}</div>;
    }
}

export default Result;
