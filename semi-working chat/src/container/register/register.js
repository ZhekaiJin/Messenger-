import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'

@connect(
	state=>state.user,
	{register}
)
class Register extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			user:'',
			pwd:'',
			repeatpwd:'',
			type:'student'
		}
		this.handleRegister = this.handleRegister.bind(this)
	}
	handleChange(key,val){
		this.setState({
			[key]:val
		})
	}
	handleRegister(){
		this.props.register(this.state)
	}
	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<List>
					{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
					<InputItem
						onChange={v=>this.handleChange('user',v)}
					>Username</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={v=>this.handleChange('pwd',v)}
					>Password</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={v=>this.handleChange('repeatpwd',v)}
					>Confirm</InputItem>
					<WhiteSpace />
					<RadioItem
						checked={this.state.type=='student'}
						onChange={()=>this.handleChange('type','student')}
					>
						Student
					</RadioItem>
					<RadioItem
						checked={this.state.type=='professor'}
						onChange={()=>this.handleChange('type','professor')}
					>
						Professor
					</RadioItem>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegister}>Register</Button>
				</List>


			</div>

		)
	}
}

export default Register
