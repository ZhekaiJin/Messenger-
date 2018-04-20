
import axios from 'axios'
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState={
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	type:''
}
// reducer
export function user(state=initState, action){
	switch(action.type){
		case REGISTER_SUCCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
		case LOGIN_SUCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		default:
			return state
	}
}

function registerSuccess(data){
	return { type:REGISTER_SUCCESS, payload:data}
}
function loginSuccess(data){
	return { type:LOGIN_SUCESS , payload:data}
}
function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

export function loadData(userinfo){
	console.log(loadData)
	return { type:LOAD_DATA, payload:userinfo}
}
export function login({user,pwd}){
	if (!user||!pwd) {
		return errorMsg('you must enter username and password')
	}
	return dispatch=>{
		axios.post('/user/login',{user,pwd})
			.then(res=>{
				if (res.status==200&&res.data.code===0) {
					// dispatch(registerSuccess({user,pwd,type}))
					dispatch(loginSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}


}

export function regisger({user,pwd,repeatpwd,type}){
	if (!user||!pwd||!type) {
		return errorMsg('you must enter username and password')
	}
	if (pwd!==repeatpwd) {
		return errorMsg('password is not the same as confirm')
	}
	return dispatch=>{
		axios.post('/user/register',{user,pwd,type})
			.then(res=>{
				if (res.status==200&&res.data.code===0) {
					dispatch(registerSuccess({user,pwd,type}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}

}
