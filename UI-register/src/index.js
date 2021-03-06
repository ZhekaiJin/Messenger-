import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'
import ProfessorInfo from './container/professorinfo/professorinfo'
import StudentInfo from './container/studentinfo/studentinfo'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
				<Route path='/professorinfo' component={ProfessorInfo}></Route>
				<Route path='/studentinfo' component={StudentInfo}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/register' component={Register}></Route>
				<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
