import React from "react";
import {withRouter} from 'react-router'
import {addUser} from "./data.js"

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accountName: '',
            ps: '',
            ps2: '',
            email: '',
            dob: '',
            zipcode: '',
            // phone: '',
            // displayName: '',
        }
    }

    handleClear() {
        this.setState({ accountName: ''})
        this.setState({ ps: ''})
        this.setState({ ps2: ''})
        this.setState({ email: ''})
        this.setState({ dob: ''})
        this.setState({ zipcode: ''})
        // this.setState({ address: ''})
        // this.setState({ company: ''})
        // this.setState({ website: ''})
        // this.setState({ phone: ''})
        // this.setState({ displayName: ''})
    }

    handleClick() {
        //check validation for username
        if(this.state.accountName.length === 0) {
            alert("Please enter an account name!")
            return
        }
        if(this.state.accountName.substring(0, 1) <= '9' && this.state.accountName.substring(0, 1) >= '0'){
            alert("Invalid Account Name")
            return
        }
        for(let i = 1; i < this.state.accountName.length; i++){
            let c = this.state.accountName.charAt(i);
            if( (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')){

            }else{
                alert("Invalid Account Name!")
                return
            }
        }

        //check validation for email
        if(this.state.email.length === 0) {
            alert("Please enter an email address!")
            return
        }
        let validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]/;
        if (! this.state.email.match(validRegex)){
            alert("Invalid Email Address!")
            return
        }

        //check validation for phone number
        // if(this.state.phone.length === 0) {
        //     alert("Please enter a phone number!")
        //     return
        // }
        // let validRegex2 = /(^\d{3}-\d{3}-\d{4}$)/;
        // if (! this.state.phone.match(validRegex2)){
        //     alert("Invalid Phone Number!")
        //     return
        // }

        //check validation for age
        if(this.state.dob.length === 0) {
            alert("Please enter a date of birth!")
            return
        }

        // check validation for zipcode
        if(this.state.zipcode.length === 0) {
            alert("Please enter a zipcode!")
            return
        } else if (this.state.zipcode.length !== 5) {
            alert("Length of zipcode must be 5")
            return
        } else {
            for(let i = 0; i < this.state.zipcode.length; i++){
                const c = this.state.zipcode.charAt(i);
                if( c >= '0' && c <= '9'){

                }else{
                    alert("Invalid zipcode!")
                    return
                }
            }
        }

        // check validation for password
        if(this.state.ps.length === 0) {
            alert("Please enter a password!")
            return
        }
        if(this.state.ps !== this.state.ps2) {
            alert("Passwords are not matching!")
            return
        }

        // var id = localStorage.getItem("max_id")
        // localStorage.setItem("max_id",Number(id)+1)
        //
        // var user = {
        //     id:Number(id)+1,
        //     name:this.state.accountName,
        //     username:this.state.displayName,
        //     password:this.state.ps,
        //     email:this.state.email,
        //     phone:this.state.phone,
        //     website:this.state.website,
        //     address:{
        //         street:this.state.address
        //     },
        //     company:{
        //         name:this.state.company
        //     }
        // }
        // // delete(user.ps2)
        // if(addUser(user)){
        //     localStorage.setItem('currentUser', JSON.stringify(user))
        //     localStorage.setItem('currentUserId', user.id)
        //     localStorage.setItem('loginState', "login")
        //     this.props.history.push('/main')
        // }else{
        //     alert("Add User Error: Existing Account Name!")
        // }
       
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:4000/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body: `username=${this.state.accountName}&password=${this.state.ps}&email=${this.state.email}&dob=${this.state.dob}&zipcode=${this.state.zipcode}`
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
        }).catch(function(error){
            console.log(error)
        })
        this.props.history.push('/main')
    }

    render() {
        return (
            <div class="RegisterComponent">
                <h1>
                    Register
                </h1>
                <h2>
                    If you don't have an account yet, please register <br/>
                    <br/>
                    Account name can only be upper or lower case letters and numbers, but may not start with a number <br/>
                    Password and confirmation password must match <br/>
                </h2>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        Account Name :
                        <input type="text" onChange={(e) => this.setState({accountName: e.target.value})}/>
                        <br/>
                        <br/>
                        {/*Display Name (optional) :*/}
                        {/*<input type="text" onChange={(e) => this.setState({displayName: e.target.value})}/>*/}
                        {/*<br/>*/}
                        {/*<br/>*/}
                        Password :
                        <input type="password" onChange={(e) => this.setState({ps: e.target.value})}/>
                        <br/>
                        <br/>
                        Confirm Password :
                        <input type="password" onChange={(e) => this.setState({ps2: e.target.value})}/>
                        <br/>
                        <br/>
                        Email Address :
                        <input type="email" onChange={(e) => this.setState({email: e.target.value})}/>
                        <br/>
                        <br/>
                        {/*Phone Number :*/}
                        {/*<input type="tel" placeholder="XXX-XXX-XXXX" onChange={(e) => this.setState({phone: e.target.value})}/>*/}
                        {/*<br/>*/}
                        {/*<br/>*/}
                        Date of Birth :
                        <input type="date" onChange={(e) => this.setState({dob: e.target.value})}/>
                        <br/>
                        <br/>
                        Zipcode :
                        <input type="text" onChange={(e) => this.setState({zipcode: e.target.value})}/>
                        <br/>
                        <br/>
                        {/*Address :*/}
                        {/*<input type="text" onChange={(e) => this.setState({address: e.target.value})}/>*/}
                        {/*<br/>*/}
                        {/*<br/>*/}
                        {/*Website：*/}
                        {/*<input type="text" onChange={(e) => this.setState({website: e.target.value})}/>*/}
                        {/*<br/>*/}
                        {/*<br/>*/}
                        {/*Company:*/}
                        {/*<input type="text" onChange={(e) => this.setState({company: e.target.value})}/>*/}
                        {/*<br/>*/}
                        {/*<br/>*/}
                        <button onClick={() => this.handleClick()}>Register</button>
                    </form>
                    <button onClick={() => this.handleClear()}>Clear</button>
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterComponent)