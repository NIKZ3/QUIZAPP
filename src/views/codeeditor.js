import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import axios from "axios";
import {
    Button,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Label,
    Input,
} from "reactstrap";
import { data } from "jquery";
const code = `
WRITE CODE HERE 

`;

class Codeeditor extends React.Component {
    state = { code: code, question: "", output: "" };

    componentDidMount() {
        axios
            .get("http://localhost:3001/getQuestion")
            .then((response) => {
                this.setState({ question: response.data.question.q });
                alert("Start the Test");
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
                alert("Question Fetch Failed");
            });
    }
    onSubmitHandler = () => {
        axios
            .post(
                "http://localhost:3001/submitCode",
                { code: this.state.code } //,
                /*{
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                }*/
            )
            .then((response) => {
                alert("Submission Success");
                const data = response.data;
                const dataString = JSON.stringify(data);
                this.setState({ output: dataString }, () => {
                    console.log(this.state);
                });
                console.log(response);
            })
            .catch((e) => {
                console.log(e);
                alert("Submission Failed");
            });
    };

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle style={{ fontSize: 16 }}>Question</CardTitle>
                        {this.state.question}
                    </CardBody>
                </Card>

                <Editor
                    value={this.state.code}
                    onValueChange={(code) => this.setState({ code })}
                    highlight={(code) => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
                <Button
                    className="mr-1 bg-primary"
                    onClick={this.onSubmitHandler}
                >
                    Submit
                </Button>

                <Card>
                    <CardBody>
                        <CardTitle style={{ fontSize: 16 }}>
                            TestCase Outputs
                        </CardTitle>
                        {this.state.output}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Codeeditor;
