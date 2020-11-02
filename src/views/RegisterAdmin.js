import React, { Component } from "react";
import Login from "../Containers/Login";
import axios from "axios";
import { Redirect } from "react-router";

class RegisterAdmin extends Component {
    state = {
        email: "",
        password: "",
    };

    emailChangeHandler = (event) => {
        this.setState({ email: event.target.value });
    };

    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
    };

    //TODO:- Route to question page or route to admin page
    onSubmitHandler = () => {
        if (this.state.email === "" || this.state.password === "") {
            alert("ENTER EMAIL AND PASSWORD");
        } else {
            axios
                .post(
                    "http://localhost:3001/registerAdmin",
                    {
                        emailID: this.state.email,
                        password: this.state.password,
                    },
                    {
                        headers: {
                            authorization: localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    alert("Admin added");
                })
                .catch((e) => {
                    console.log(e);
                    if (e.response.status == 401) {
                        alert("Unauthorized");
                    } else {
                        alert("Something went wrong");
                    }
                });
        }
    };

    onSubmitHandlerAdmin = () => {
        if (this.state.email === "" || this.state.password === "") {
            alert("ENTER EMAIL AND PASSWORD");
        } else {
            axios
                .post("http://localhost:3001/registerAdmin", {
                    emailID: this.state.email,
                    password: this.state.password,
                })
                .then((response) => {
                    alert("success");
                })
                .catch((e) => {
                    console.log(e);
                    alert("Something went wrong");
                });
        }
    };

    render() {
        let isAdmin = localStorage.getItem("isAdmin");

        return (
            <div className="content" style={{ margin: "75px" }}>
                <Login
                    name="ADD ADMIN"
                    onSubmitHandler={this.onSubmitHandler}
                    emailChangeHandler={(event) =>
                        this.emailChangeHandler(event)
                    }
                    passwordChangeHandler={(event) =>
                        this.passwordChangeHandler(event)
                    }
                />
            </div>
        );
    }
}

export default RegisterAdmin;
