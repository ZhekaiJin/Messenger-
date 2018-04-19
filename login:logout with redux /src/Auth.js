import React from 'react'
import { connect } from 'react-redux'
import { login,getUserData } from './Auth.redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

// we have two reducer [username passward]  see reducer.js to combine them
@connect(
	state=>state.auth,
	{login}
)
class Auth extends React.Component{
	constructor(props) {
		super(props)
	}
	// 	this.state={
	// 		data:{}
	// 	}
	// }
	// componentDidMount() {
	// 	this.props.getUserData()
	// 	// axios.get('/data')
		// 	.then(res=>{
		// 		if (res.status===200) {
		// 			this.setState({data:res.data})
		// 		}
		// 	})
	render(){
		return (
			<div>
				<h2>MY NAME IS {this.props.user},AGE{this.props.age}</h2>
				{ this.props.isAuth? <Redirect to='/dashboard' /> : null}
				<h2>YOU DONT HAVE ACESS</h2>
				<button onClick={this.props.login}>LOGIN</button>
			</div>
		)
	}
}

export default Auth
