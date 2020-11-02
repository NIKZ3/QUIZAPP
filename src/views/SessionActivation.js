import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Label,
    Input,
    Button,
} from "reactstrap";
import axios from "axios";
class SessionActivation extends Component {
    state = {
        SessionID: [],
    };
    sessionData = [];

    activateHandler = (i) => {
        axios
            .post(
                "http://localhost:3001/sessionActivation",
                { SessionID: this.state.SessionID[i] },
                {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((reponse) => {
                alert("successful Activation");
            })
            .catch((e) => {
                alert("Error");
            });
    };

    deActivateHandler = (i) => {
        console.log(this.state.SessionID[i]);
        axios
            .post(
                "http://localhost:3001/sessionDeactivation",
                { SessionID: this.state.SessionID[i] },
                {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response);
                alert("successful Deactivation");
            })
            .catch((e) => {
                alert("Error");
            });
    };

    componentDidMount() {
        axios
            .get("http://localhost:3001/getMySessions", {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response);
                this.setState({ SessionID: response.data });
            })
            .catch((e) => {
                console.log(e);
                alert("Error");
            });
    }

    render() {
        for (let i in this.state.SessionID) {
            this.sessionData.push(
                <Card key={this.state.SessionID[i]}>
                    <CardBody>
                        <CardTitle style={{ fontSize: 16 }}>
                            SessionID : {this.state.SessionID[i]}
                        </CardTitle>
                        <Button
                            color="primary"
                            onClick={() => this.activateHandler(i)}
                        >
                            Activate Test
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => this.deActivateHandler(i)}
                        >
                            Deactivate Test
                        </Button>
                    </CardBody>
                </Card>
            );
        }

        return <div>{this.sessionData}</div>;
    }
}

export default SessionActivation;
