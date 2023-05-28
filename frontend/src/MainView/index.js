import React from "react";
import ArticleComponent from "./ArticleComponent";
import SideBarComponent from "./SideBarComponent";
import ProfileComponent from "./ProfileComponent";
import './style.css'

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1 class="heading">
                    Welcome to the Main Page!
                </h1>

                <ProfileComponent></ProfileComponent>

                <div class="container">
                    <div class="side">
                        <SideBarComponent></SideBarComponent>
                    </div>
                    <div class="post">
                        <ArticleComponent></ArticleComponent>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main