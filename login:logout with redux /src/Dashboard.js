import React from 'react'
import { Link, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import App from './App'
import { logout } from './Auth.redux.js'
function Erying(){
	return <h2>group2</h2>
}
function Qibinglian(){
	return <h2>gorup3</h2>
}
@connect(
	state=>state.auth,
	{logout}
)
class Dashboard extends React.Component{
	render(){
		const match = this.props.match
		console.log(match)
		const redirectToLogin = <Redirect to='/login'></Redirect>
		const app = (
			<div>
				<h1>groups</h1>
				{this.props.isAuth? <button onClick={this.props.logout}>LOGOUT</button>:null}
				<ul>
					<li>
						<Link to={`${match.url}/`}>group1</Link>
					</li>
					<li>
						<Link to={`${match.url}/erying`}>group2</Link>
					</li>
					<li>
						<Link to={`${match.url}/qibinglian`}>group3</Link>
					</li>
				</ul>
				<Route path={`${match.url}/`} exact component={App}></Route>
				<Route path={`${match.url}/erying`} component={Erying}></Route>
				<Route path={`${match.url}/qibinglian`} component={Qibinglian}></Route>
			</div>
		)

		return this.props.isAuth ? app: redirectToLogin
	}
}

export default Dashboard
