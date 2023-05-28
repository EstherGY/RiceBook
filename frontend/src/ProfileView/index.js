import React from "react";
import ProfilePicComponent from "./ProfilePicComponent";
import PersonalInfoComponent from "./PersonalInfoComponent";
import {Link} from 'react-router-dom'
import "./style.css";


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <h1 class="heading">
                    Welcome to your profile!
                </h1>
                <ProfilePicComponent></ProfilePicComponent>
                <PersonalInfoComponent></PersonalInfoComponent>
                <h2 class="heading">
                    <Link to='/main' class='navigation'>Go Back to Main Page</Link>
                </h2>
            </div>
        )
    }
}

export default Profile