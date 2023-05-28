import React from "react";
import "./style.css";
import axios from "axios";

class ProfilePicComponent extends React.Component {
    constructor() {
        super()
        // var path = localStorage.getItem("profilePicture")
        this.state = {
            path: ""
        }
    }

    async componentDidMount() {
        let res = await axios.get(`/avatar/:user?username=${localStorage.getItem("username")}`);
        let path = res.data;
        console.log(path);
        this.setState({
            path: path
        })
    }

    updateProfilePicture(path){
        this.setState({
            path:path
        })
        let data = {"username": localStorage.getItem("username"), "avatar": this.state.path};
        axios.put('/avatar',data)
            .then(res=>{
                console.log('res=>',res);
            })
    }

    render() {
        return(
            <div class="profilePic">
                <h2>
                    Your Profile Picture
                </h2>
                <img src={this.state.path}></img>
                <br/>
                <h3>
                    Change your profile picture :
                <input type='file' onChange={(e) => this.updateProfilePicture(e.target.value)}></input>
                </h3>
            </div>
        )
    }
}

export default ProfilePicComponent