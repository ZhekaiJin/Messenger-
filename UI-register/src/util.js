
export function getRedirectPath({type, avatar}){
	// 根据用户信息 返回跳转地址
	// user.type /professor /student
	// user.avatar /professorinfo /studuentinfo
	let url = (type==='professor')?'/professor': '/student'
	if (!avatar) { //only if they dont have avatar we redirect them to the info filling page 
		url += 'info'
	}
	return url
}
