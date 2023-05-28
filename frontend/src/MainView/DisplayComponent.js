import React from "react";
import SingleComponent from "./SingleComponent";

class DisplayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterPosts: [],
    };
  }

  componentDidMount() {
    setInterval(() => this.refresh(), 1000);
  }

  refresh() {
    var posts = JSON.parse(localStorage.getItem("current_posts"));
    this.setState({
      filterPosts: posts,
    });
  }
  isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

  render() {
    if (this.props.diaplayPosts.length === 0) {
      return <div>There is no article</div>;
    }

    var state = localStorage.getItem("postState");
    var user = localStorage.getItem("username");
    // var friends = JSON.parse(localStorage.getItem("friendList"));
    let friends = []
    var ids = []
    for(var i=0;i<friends.length;i++){
      ids[ids.length] = friends[i].id
    }
    var user_id = user.id;
    if (state === "post") {
      var new_posts = [];
      for (var i = 0; i < this.props.diaplayPosts.length; i++) {
        let post = this.props.diaplayPosts[i];
        if (post.userId === user_id || post.author === user) {
          new_posts[new_posts.length] = post;
        } else if (this.isInArray(ids,Number(post.userId))) {
          new_posts[new_posts.length] = post;
        }
      }
      this.state.filterPosts = new_posts;
      // localStorage.setItem(
      //   "current_posts",
      //   JSON.stringify(this.state.filterPosts)
      // );
      localStorage.setItem("postState", "after");
    }
    // else {
    //   this.state.filterPosts = JSON.parse(
    //     localStorage.getItem("current_posts")
    //   );
    // }

    return (
      <div>
        {this.state.filterPosts.map((post) => (
          <div key={post.id}>
            <SingleComponent post={post}></SingleComponent>
          </div>
        ))}
      </div>
    );
  }
}

export default DisplayComponent;
