import React from 'react'
import { connect } from 'react-redux'
import { addUser, removeUser, addUserAsync } from './index.redux'

@connect( // decorator
	//  what you want to be in props
	state=>({num:state.counter}),
	// what action you want in the props ==> redux-react handles the dispatch automatically
	{ addUser, removeUser, addUserAsync }
)
class App extends React.Component{
	render(){
		return (
			<div>
				<h1>Usernumber we have{this.props.num}</h1>
				<button onClick={this.props.addUser}> Add User </button>
				<button onClick={this.props.removeUser}>Remove User </button>
				<button onClick={this.props.addUserAsync}>Add User Asyncly</button>
			</div>
		)
	}
}


export default App
