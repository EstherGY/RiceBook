import React from "react";
import "./style.css";
import { followUser, loadPostsByUser, unfolloUser,initializeFriendList } from "./mainServer.js";

class SideBarComponent extends React.Component {
  constructor() {
    super();
    var user_id = localStorage.getItem("currentUserId");
    if (user_id > 10) {
      this.state = {
        friendList: [
          {
            path: "https://via.placeholder.com/600/92c952",
            name: "Bret",
            status: "hildegard.org",
            id: 1,
          },
        ],
        input: "",
      };
      localStorage.setItem("friendList",JSON.stringify(friendList))
    } else {
      this.state = {
        friendList: [],
      };
      var friendList = this.state.friendList;
      (async () => {
        if (user_id == 10) {
          user_id = 0;
        }
        user_id = Number(user_id)
        for (var i = user_id + 1; i <= user_id + 3; i++) {
          friendList = await initializeFriendList(i, friendList);
        }
        this.setState({
          friendList:friendList
        })
        localStorage.setItem("friendList",JSON.stringify(friendList))
      })();      
    }
  }

  async handleFollow() {
    if (this.state.input === "") {
      alert("Please enter an user name");
      return;
    }
    console.log(this.state.friendList);
    var result = await followUser(this.state.input, this.state.friendList);
    this.setState({
      friendList: result,
    });
    localStorage.setItem("friendList",JSON.stringify(result))


    // const f = {
    //     path: 'https://via.placeholder.com/600/56a8c2',
    //     name: this.state.input,
    //     status: 'Multi-tiered zero tolerance productivity',
    //     id: this.state.input,
    // }
    // const updatedFriends= [
    //     f,
    //     ...this.state.friendList
    // ]
    // this.setState({
    //     friendList : updatedFriends
    // })
  }

  handleUnfollow(id) {
    this.setState({
      friendList: unfolloUser(id, this.state.friendList),
    });
  }

  render() {
    if (this.state.friendList.length === 0) {
      return (
        <div>
          <h2>Find some friends to follow!</h2>
          <p>
            Search some friends here :
            <input
              onChange={(e) => this.setState({ input: e.target.value })}
            ></input>
            <button onClick={() => this.handleFollow()}>Follow</button>
          </p>
        </div>
      );
    }
    return (
      <div>
        <h2>Your friend list:</h2>
        {this.state.friendList.map((f) => (
          <div key={f.id}>
            <img src={f.path}></img>
            <p>Name: {f.name}</p>
            <p>Status: {f.status}</p>
            <button onClick={() => this.handleUnfollow(f.id)}>Unfollow</button>
            <br />
            <br />
          </div>
        ))}
        <br />
        <br />
        <p>
          Search some friends here :
          <input
            onChange={(e) => this.setState({ input: e.target.value })}
          ></input>
          <button onClick={() => this.handleFollow()}>Follow</button>
        </p>
      </div>
    );
  }
}

export default SideBarComponent;
