import React from "react";
import "./style.css";

class DisplayComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="personalInfo">
                <h2>
                    Your Personal Information
                </h2>
                <table class='userInfo-display' border="1">
                    <tr>
                        <td>Account Name</td>
                        <td>{this.props.personalInfo.name}</td>
                    </tr>
                    <tr>
                        <td>Display Name</td>
                        <td>{this.props.personalInfo.username}</td>
                    </tr>
                    <tr>
                        <td>Email Address</td>
                        <td>{this.props.personalInfo.email}</td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>{this.props.personalInfo.phone}</td>
                    </tr>
                    <tr>
                        <td>Zipcode</td>
                        <td>{this.props.personalInfo.zipcode}</td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td>{this.props.personalInfo.dob}</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default DisplayComponent