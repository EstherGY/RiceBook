import React from "react";
import axios from "axios";

class AddComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: '',
            body: '',
            title: '',
            userId: "EstherGY",
        }
    }

    handlePost() {
        if (this.state.body.length === 0) {
            alert('Please enter an article!')
            return
        }
        let data = {"text": this.state.body, "username": localStorage.getItem("username")};
        axios.post('/article',data)
            .then(res=>{
                console.log('res=>',res);
            })
        // this.props.handleAdd(this.state)
        this.setState ({body: '',})
    }

    handleCancel() {
        this.setState ({body: '',})
    }

    handleSubmit = (e) => {
        // e.preventDefault()
        // fetch('http://localhost:4000/article', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json,text/plain,*/*',
        //         //'Content-Type':'application/x-www-form-urlencoded',
        //         'Content-Type':'application/json'
        //     },
        //     body: `text=${this.state.input}`,
        //     //body: JSON.stringify(this.state)
        // }).then((response)=>{
        //     return response.json()
        // }).then((data)=>{
        //     console.log(data)
        // }).catch((error)=>{
        //     console.log(error)
        // })
    }

    render() {
        return(
            <div>
                <h2>
                    Add a new article:
                    <br/>
                    <textarea onChange={(e) => this.setState({body: e.target.value})}/>
                    <button onClick={() => this.handlePost()}>Post</button>
                    <button onClick={() => this.handleCancel()}>Cancel</button>
                    <input type='file'></input>
                </h2>
            </div>
        )
    }
}

export default AddComponent