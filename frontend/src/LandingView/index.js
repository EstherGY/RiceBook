import React from "react";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import {login} from "./data.js"


class Landing extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <LoginComponent></LoginComponent>
                <RegisterComponent></RegisterComponent>
            </div>
        )
    }
}

export default Landing