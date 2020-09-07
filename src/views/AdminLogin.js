import React, { Component } from "react";
import Login from "../Containers/Login";
import axios from "axios";
import { Redirect } from "react-router";

class AdminLogin extends Component {
    state = {
        email: "",
        password: "",
        redirect: 0,
    };

    emailChangeHandler = (event) => {
        this.setState({ email: event.target.value });
    };

    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
    };

    changeHandler = () => {
        console.log("works");
    };

    //TODO:- Route to question page or route to admin page
    onSubmitHandler = () => {
        if (this.state.email === "" || this.state.password === "") {
            alert("ENTER EMAIL AND PASSWORD");
        } else {
            axios
                .post("http://localhost:3001/login", {
                    emailID: this.state.email,
                    password: this.state.password,
                })
                .then((response) => {
                    console.log(response);
                    if (response.data.token !== undefined) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("isAdmin", response.data.isAdmin);
                        console.log("SS");
                        this.setState({ redirect: 1 }, () => {
                            console.log(this.state.redirect);
                        });
                    } else {
                        alert("login denied");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    alert("Something went wrong");
                });
        }
    };

    /*redirectState;
    componentDidUpdate() {}*/

    render() {
        let isAdmin = localStorage.getItem("isAdmin");
        if (this.state.redirect === 1 && isAdmin === "false") {
            return <Redirect from="admin/login" to="/admin/exam" />;
        } else if (this.state.redirect == 1 && isAdmin == "true") {
            return <Redirect to="/admin/schedule" />;
        } else {
            return (
                <div className="content" style={{ margin: "75px" }}>
                    <Login
                        name="ADMIN LOGIN"
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
}

export default AdminLogin;
