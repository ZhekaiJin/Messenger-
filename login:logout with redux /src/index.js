import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
	BrowserRouter,
	Route,
	Redirect,
	Switch
} from 'react-router-dom'

import reducers from './reducer'
import Auth from './Auth.js'
import Dashboard from './Dashboard'
import './config'
import 'antd-mobile/dist/antd-mobile.css';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f // this is for web dev tools
))


// login
// 	no login in for  go to login
// dashboard
// 	site1
// 	site2
// 	site3
// router+redux
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<Switch>
					<Route path='/login' component={Auth}></Route>
				  <Route path='/dashboard' component={Dashboard}></Route>
				  <Redirect to='/dashboard'></Redirect>
			</Switch>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
