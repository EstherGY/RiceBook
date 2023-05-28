import React from "react";
import DisplayComponent from "./DisplayComponent";
import "./style.css";
import AddComponent from "./AddComponent";
import { searchPost } from "./mainServer";
import axios from "axios";

class ArticleComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      nextId: 0,
      input: "",
    };
  }

  async componentDidMount() {
    let res = await axios.get(`/articles?username=${localStorage.getItem("username")}`);
    let new_articles = [];
    Object.keys(res.data.articles).forEach(function(key){
      new_articles.push(res.data.articles[key]);
    });
    console.log(new_articles);
    this.setState({
        posts: new_articles,
        // nextId: this.state.nextId + 1,
    });
    // fetch("http://localhost:4000/articles", {
    //     method: 'post',
    //     headers: {
    //         'Accept': 'application/json,text/plain,*/*',
    //         'Content-Type':'application/x-www-form-urlencoded',
    //         // "Access-Control-Allow-Origin": "*",
    //         //'Content-Type':'application/json'
    //       }
    // }).then((res) => res.json())
    //   .then((data) => {
    //       console.log(data);
    //     // this.setState({
    //     //   posts: data,
    //     //   nextId: data.length + 1,
    //     // });
    //     // localStorage.setItem("posts",JSON.stringify(data))
    //   });
    localStorage.setItem("postState", "post");
  }

  handleAdd = () => {
    let data = {"text": this.state.body, "username": localStorage.getItem("username")};
    axios.post('/article',data)
        .then(res=>{
          console.log('res=>',res);
        })

    // var posts= JSON.parse(localStorage.getItem("current_posts"))
    // console.log(posts)
    // var article={
    //     userId:localStorage.getItem("currentUserId"),
    //     id:this.state.nextId+1,
    //     body:e.body,
    //     title:e.title
    // }
    // var new_posts = [article,...posts]
    // console.log(new_posts)
    // localStorage.setItem("postState","add")
    // localStorage.setItem("current_posts",JSON.stringify(new_posts))

  };

  async handleSearch() {
    //search by author and text
    if (this.state.input.length === 0) {
      alert("Please enter the material that you want to search");
      return;
    }
    let res = await axios.get(`/articles?username=${this.state.input}`);
    let new_articles = [];
    Object.keys(res.data.articles).forEach(function(key){
      new_articles.push(res.data.articles[key]);
    });
    console.log(new_articles);
    this.setState({
      posts: new_articles,
      // nextId: this.state.nextId + 1,
    });
    // searchPost(this.state.input)
  }

  render() {
    return (
      <div>
        <AddComponent handleAdd={this.handleAdd}/>
        <h2>
          Search an article:
          <div>
            <input
    onChange={(e) => this.setState({input: e.target.value})}/>
            <button onClick={() => this.handleSearch()}>Search</button>
          </div>
        </h2>

        <h2>Articles:</h2>
        <DisplayComponent diaplayPosts={this.state.posts}/>
      </div>
    );
  }
}

export default ArticleComponent;
