const ADD_User = 'ADD USER'
const REMOVE_User = 'REMOVE USER'

// reducer
export function counter(state=10, action){
	switch(action.type){
		case ADD_User:
			return state+1
		case REMOVE_User:
			return state-1
		default:
			return state
	}
}

// action creator
export function addUser(){
	return {type:ADD_User}
}
export function removeUser(){
	return {type:REMOVE_User}
}
export function addUserAsync(){
	return dispatch=>{
		setTimeout(()=>{
			dispatch(addUser())
		}, 2000)
	}
}
