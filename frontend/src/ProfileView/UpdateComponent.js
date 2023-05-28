import React from "react";
import axios from "axios";

class UpdateComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : props.personalInfo.name,
            username : props.personalInfo.username,
            email : props.personalInfo.email,
            phone : props.personalInfo.phone,
            zipcode :props.personalInfo.zipcode,
            dob : props.personalInfo.dob,
        }
    }

    handleClear() {
        this.setState({ accountName: ''})
        this.setState({ displayName: ''})
        this.setState({ email: ''})
        this.setState({ phone: ''})
        this.setState({ dob: ''})
        this.setState({ zipcode: ''})
        this.setState({ ps: ''})
        this.setState({ ps2: ''})
    }

    handleUpdateClick() {
        //check account name
        if (this.state.accountName.length != 0) {
            if(this.state.accountName.substring(0, 1) <= '9' && this.state.accountName.substring(0, 1) >= '0'){
                alert("Invalid Account Name")
                return
            }
            for(let i = 1; i < this.state.accountName.length; i++){
                let c = this.state.accountName.charAt(i);
                if( (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')){
                    continue
                }else{
                    alert("Invalid Account Name!")
                    return
                }
            }
        }

        //check email address
        if (this.state.email.length != 0) {
            let validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]/;
            if (! this.state.email.match(validRegex)){
                alert("Invalid Email Address!")
                return
            }
        }

        // check phone number
        if (this.state.phone.length != 0) {
            let validRegex2 = /(^\d{3}-\d{3}-\d{4}$)/;
            if (! this.state.phone.match(validRegex2)){
                alert("Invalid Phone Number!")
                return
            }
        }

        //check zipcode
        if (this.state.zipcode.length != 0) {
            if (this.state.zipcode.length != 5) {
                alert("Invalid zipcode")
                return
            } else {
                for(var i = 0; i < this.state.zipcode.length; i++){
                    var c = this.state.zipcode.charAt(i);
                    if( c >= '0' && c <= '9'){
                        continue
                    }else{
                        alert("Invalid zipcode!")
                        return
                    }
                }
            }
        }

        // check password
        if (this.state.ps.length != 0 || this.state.ps2.length != 0){
            if(this.state.ps != this.state.ps2) {
                alert("Passwords are not matching!")
                return
            } else {
                this.state.ps = this.state.ps.replace(/./g, "*");
            }
        }

        this.props.update(this.state);
    }

    handleHeadlineChange = (e) => {
        this.setState({
            accountName: e.target.value
        })
        let data = {"headline": this.state.accountName, "username": localStorage.getItem("username")};
        axios.put('/headline',data)
            .then(res=>{
                console.log('res=>',res);
            })
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
        let data = {"email": this.state.accountName, "username": localStorage.getItem("username")};
        axios.put('/email',data)
            .then(res=>{
                console.log('res=>',res);
            })
    }

    handleZipcodeChange = (e) => {
        this.setState({
            zipcode: e.target.value
        })
        let data = {"zipcode": this.state.accountName, "username": localStorage.getItem("username")};
        axios.put('/zipcode',data)
            .then(res=>{
                console.log('res=>',res);
            })
    }

    render() {
        return (
            <div>
                <div class="updateInfo">
                <h2>
                    Update your personal info
                </h2>
                <form class="userInfo-change">
                    Account Name:
                    <input type="text" name="accountName"
                           onChange={this.handleHeadlineChange}>
                    </input>
                    <br/>
                    <br/>
                    Display Name:
                    <input type="text" name="displayName"
                           onChange={(e) => this.setState({displayName: e.target.value})}/>
                    <br/>
                    <br/>
                    Email Address:
                    <input type="text" name="email"
                           onChange={this.handleEmailChange}/>
                    <br/>
                    <br/>
                    Phone Number:
                    <input type="tel" name="phone" placeholder="XXX-XXX-XXXX"
                           onChange={(e) => this.setState({phone: e.target.value})}/>
                    <br/>
                    <br/>
                    Date of Birth:
                    <input type="date" name="dob"
                           onChange={(e) => this.setState({dob: e.target.value})}/>
                    <br/>
                    <br/>
                    Zipcode:
                    <input type="zipcode" name="zipcode" placeholder="xxxxx"
                           onChange={this.handleZipcodeChange}/>
                    <br/>
                    <br/>
                    Password:
                    <input type="password" name="ps"
                           onChange={(e) => this.setState({ps: e.target.value})}/>
                    <br/>
                    <br/>
                    Password Confirmation :
                    <input type="password" name="ps2"
                           onChange={(e) => this.setState({ps2: e.target.value})}/>
                    <br/>
                    <br/>
                </form>

                <button >Update</button>
                <button onClick={() => this.handleClear()}>Clear</button>
                </div>
            </div>
        )
    }
}

export default UpdateComponent