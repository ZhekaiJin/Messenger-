export function getRedirectPath({type,avatar}){
		let url = (type==='professor')?'/professor': '/student'
    if (!avatar) {
        url += 'info'
    }
    return url
}
