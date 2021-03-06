import React from 'react'
import { connect } from 'react-redux'
import { login, getUserData } from './Auth.redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

// we have two reducer [username passward]  see reducer.js to combine them
@connect(
	state=>state.auth,
	{login, getUserData}
)
class Auth extends React.Component{
	//what we do when we dont have redux to talk to backend
	// constructor(props){
	// 	super(props);
	// 	this.state= {
	// 		data:{}
	// 	}
	// }
	componentDidMount() {
		this.props.getUserData()
		}
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
