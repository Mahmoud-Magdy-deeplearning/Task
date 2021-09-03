import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();
// if(cookies.get('token')) {
// axios.interceptors.request.use(function (config) {
// config.headers.authorization = `Bearer ${cookies.get('token')}`
// 	return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });
// }
export default class UploadComponent extends Component {


constructor(){super();
	this.state ={
		file : null,
		redirect : false,
		items: [],
		name:"",
		edit:null
	}
}
async a(){
console.log("wwwwwwwwwwwww")
var data = await axios({
method: "GET",
url: "http://127.0.0.1:5000/api/video",
withCredentials: true,

})	
let items = [...this.state.items];
items=[...data.data.items];
this.setState({ items })
console.log(this.state.items)
}
 ref(){ this.a()}
componentDidMount(){this.a();}
upload = event => {this.setState({
	file : event.target.files[0]
})} 
handleChange(e) {
	this.setState({
		name : e.target.value
	});
}
 delete = async(id) => {
	axios({
		method: "DELETE",
		url: "http://127.0.0.1:5000/api/video/"+id,
		withCredentials: true,
	  }).then(res=>{
		console.log(res)
		this.a();
	})

}
editSet = (id) => {
	this.setState({
		edit : id
	});
}
edit = async(id) => {
	axios({
		method: "PUT",
		url: "http://127.0.0.1:5000/api/video/"+id,	data: {
			"originalname":this.state.name
		},
		withCredentials: true,
	  }).then(res=>{
		console.log(res)
		this.a();
		this.setState({
			name : ""
		});
	})
	
	

}
submit = event => {
	console.log(cookies.get('token'))

	const fd = new FormData();
	fd.append('file',this.state.file, this.state.file.name)

	 
	axios({
		method: "POST",
		url: "http://127.0.0.1:5000/api/video",
		data: fd,
		withCredentials: true,

	  })
	.then(res=>{
		console.log(res)
		this.a();

	})
}
    render() {
        return (
<div>
	<input type="file" onChange={this.upload}/>
	<button onClick={this.submit}>submit</button>

	{this.state.items.map((item)=>(<div key={item._id}><a href={"http://127.0.0.1:5000/"+item.filename} target="_blank">{item.originalname} </a> 
	{item._id==this.state.edit?(<>
    <input type="text" name="text"  value={this.state.name} onChange={(e) => this.handleChange(e)}></input>
	<button onClick={()=>this.edit(item._id)}>edit</button></>):(
	<button onClick={()=>this.editSet(item._id)}>edit</button>)}
		<button onClick={()=>this.delete(item._id)}>delete</button>
</div>))}
</div>
			);
    }
}