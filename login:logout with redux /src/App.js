import React from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from './index.redux'

@connect(
	// 你要state什么属性放到props里
	state=>({num:state.counter}),
	// 你要什么方法，放到props里，自动dispatch
	{ addGun, removeGun, addGunAsync }
)
class App extends React.Component{
	render(){
		return (
			<div>
				<h1>Usernumber we have{this.props.num}</h1>
				<button onClick={this.props.addGun}>add user </button>
				<button onClick={this.props.removeGun}>remove user </button>
				<button onClick={this.props.addGunAsync}>add user asyncly</button>				
			</div>
		)
	}
}


export default App
