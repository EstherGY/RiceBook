import React from "react";

class SingleComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: this.props.post.path,
            body: this.props.post.text,
            title: this.props.post.title,
            id: this.props.post.id,
            userId: this.props.post.author,
            timestamp: "10/18/2021",
            comment: this.props.post.comments,
            displayComment:"none"
        }
        console.log(this.state)
    }

    handleComment(){
        this.setState({
            displayComment:"block"
        })
    }

    render() {
        if (this.state.path === undefined || this.state.path === "") {
                return (
                    <div>
                        <div >
                            <h5>Author: {this.state.userId}</h5>
                            <p>Title: {this.state.title}</p>
                            <p>Article: {this.state.body}</p>
                            <div style={{display:this.state.displayComment}}>Comment:{this.state.comment}</div>
                            <button onClick={() => this.handleComment()} >Comment</button>
                            <button>Edit</button>
                        </div>
                    </div>
                )
        }

        return (
            <div>
                <h5>Author: {this.state.userId}</h5>
                <img src={this.state.path}></img>
                <p>Title: {this.state.title}</p>
                <p>Article: {this.state.body}</p>
                <div style={{display:"false"}}>Comment:{this.state.comment}</div>
                <button onClick={() => this.handleComment()}>Comment</button>
                <button>Edit</button>
            </div>
        )
    }
}

export default SingleComponent