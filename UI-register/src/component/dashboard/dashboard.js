import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Switch, Route} from 'react-router-dom'
import Professor from '../../component/professor/professor'
import Student from '../../component/student/student'
import User from '../../component/user/user'

function Msg(){
	return <h2>Messege list page</h2>
}


@connect(
  state=>state
)
class Dashboard extends React.Component{
  render(){
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
			{
				path:'/professor',
				text:'student',
				icon:'boss',
				title:'Student List',
				component:Professor,
				hide:user.type=='student'
			},
			{
				path:'/student',
				text:'boss',
				icon:'job',
				title:'Professor List',
				component:Student,
				hide:user.type=='professor'
			},
			{
				path:'/msg',
				text:'Messege',
				icon:'msg',
				title:'Messege list',
				component:Msg
			},
			{
				path:'/me',
				text:'Me',
				icon:'user',
				title:'Personal Center',
				component:User
			}
		]
    return(         // the content in the each page
      <div>
        <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard
