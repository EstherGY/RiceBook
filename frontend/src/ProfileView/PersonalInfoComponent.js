import React from "react";
import UpdateComponent from "./UpdateComponent";
import DisplayComponent from "./DisplayComponent";
import axios from "axios";

class PersonalInfoComponent extends React.Component {
     constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            phone: '',
            ps: '',
            zipcode: '',
            dob: '',
        }
    }

    async componentDidMount() {
        let res = await axios.get(`/profileInfo?username=${localStorage.getItem("username")}`);
        let user = res.data;
        console.log(res);
        console.log(user);
        if (true) {
            this.setState({
                name: user.headline,
                username: user.username,
                email: user.email,
                phone: user.phone,
                zipcode: user.zipcode,
                dob: user.dob,
            })
        }
    }

    updateFunction = (newInfo) => {
        this.setState({
            name : newInfo.accountName,
            username : newInfo.displayName,
            email : newInfo.email,
            phone : newInfo.phone,
            zipcode: newInfo.zipcode,
            dob: newInfo.dob,
        })
        alert('Your personal info has been updated')
    }

    render() {
        return (
            <div>
                <DisplayComponent personalInfo={this.state}></DisplayComponent>
                <UpdateComponent personalInfo={this.state} update={this.updateFunction}></UpdateComponent>
            </div>
        )
    }
}

export default PersonalInfoComponent