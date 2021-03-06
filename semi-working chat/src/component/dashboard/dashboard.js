import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Switch,Route} from 'react-router-dom'
import Professor from '../../component/professor/professor'
import Student from '../../component/student/student'
import User from '../../component/user/user'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
import Msg from '../msg/msg'

@connect(
    state=>state,
    {getMsgList,recvMsg}
)
class Dashboard extends React.Component {
    componentDidMount() {
      if(!this.props.chat.chatmsg.length){
        this.props.getMsgList()
        this.props.recvMsg()
      }
     }
    render() {
        const user = this.props.user
        const {pathname} = this.props.location
        console.log(JSON.stringify(this.props))
        const navList = [
            {
                path:'/professor',
                text:'student',
                icon:'boss',
                title:'Student List',
                component:Professor,
                hide:user.type === 'student'
            },
            {
                path:'/student',
                text:'professor',
                icon:'job',
                title:'Professor List',
                component:Student,
                hide:user.type ==='professor'
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
        return (
            <div>
                <NavBar className='fixd-header' mode="dard">
                    {navList.find(v => v.path === pathname).title}
                </NavBar>
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
