import React, { Component } from "react";
import axios from "axios";

class Logout extends Component {
    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token != undefined && token != null) {
            axios
                .get("http://localhost:3001/logout", {
                    headers: {
                        authorization: localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    if (response.data == "Logout Failed")
                        alert("Logged Failed");
                    else {
                        localStorage.clear();
                        alert("Logged out");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    alert("Error");
                });
        }
    }
    render() {
        return <div className="content">Logging Out</div>;
    }
}

export default Logout;
