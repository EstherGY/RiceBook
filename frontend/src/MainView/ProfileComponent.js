import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { getPhoto,logOut } from "./mainServer.js";

class ProfileComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      path: "",
      status: localStorage.getItem("loginState"),
      input: "",
      name: "user",
    };
  }

  async componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/photos")
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (photos) {
    //   photos = JSON.stringify(photos);
    //   localStorage.setItem("photos", photos);
    // });

    var username = localStorage.getItem("username");

    //var path= await getPhoto(user.id)
    // localStorage.setItem("profilePicture",path)
    // this.setState({
    //   path: path,
    //   status: localStorage.getItem("loginState"),
    //   name: user.name,
    // });
  }

  handleUpdate() {
    if (this.state.input == 0) {
      alert("Please enter a new status!");
      return;
    }
    this.setState({
      status: this.state.input,
    });
  }

  handleLogOut() {
    logOut()
  }

  render() {
    return (
      <div class="profile">
        <h2>User</h2>
        <img src={this.state.path}></img>
        <div>
          <h4>User name: {this.state.name}</h4>
          <h4>Status: {this.state.status}</h4>
          <p>
            Update your status here :
            <input
              onChange={(e) => this.setState({ input: e.target.value })}
            ></input>
            <button onClick={() => this.handleUpdate()}>Update</button>
          </p>
          Go to your profile page here :<Link to="/profile">Your Profile</Link>
          <br />
          <br />
          <Link to="/landing">
            <button onClick={() => this.handleLogOut()}>Log out</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
