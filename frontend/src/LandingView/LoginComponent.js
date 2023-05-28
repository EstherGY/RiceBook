import React from "react";
import { withRouter } from "react-router";
import "./style.css";
import {login} from "./data.js"


class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accountName: '',
            ps: '',
        }
    }

    async handleClick() {
        if (this.state.accountName.length === 0) {
            alert("Please enter valid account name!")
            // if(await login(this.state.accountName,this.state.ps)){
            //     this.props.history.push('/main')
            // }else{
            //     alert("Please enter valid account name and password!")
            // }
        } else if (this.state.ps.length === 0) {
            alert("Please enter valid password!")
        } else {
            localStorage.setItem("username",this.state.accountName)
            //alert("Please enter valid account name and password!")
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:4000/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type':'application/x-www-form-urlencoded',
                //'Content-Type':'application/json'
            },
            body: `username=${this.state.accountName}&password=${this.state.ps}`,
            //body: JSON.stringify(this.state)
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
            this.props.history.push('/main')
        }).catch((error)=>{
            console.log(error)
            alert(error)
        })
    }

    render() {
        return (
            <div class="LoginComponent">
                <h1>
                    Login
                </h1>
                <h2>
                    If you already have an account, please log in
                </h2>
                <div>
                    <form onSubmit={this.handleSubmit}>
                    Account Name :
                    <input type="text" onChange={(e) => this.setState({accountName: e.target.value})}></input>
                    <br/>
                    <br/>
                    Password :
                    <input type="password" onChange={(e) => this.setState({ps: e.target.value})}></input>
                    <br/>
                    <br/>
                    <button onClick={() => this.handleClick()}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginComponent)