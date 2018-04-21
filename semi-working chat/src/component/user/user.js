import React from 'react'
import {connect} from 'react-redux'
import {Result,List,Brief,WhiteSpace,Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {logoutSubmit}
)

class User extends React.Component{

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {

        const alert = Modal.alert
        alert('Logout', 'Do you really want to quit???', [
            { text: 'cancel', onPress: () => console.log('cancel') },
            { text: 'confirm', onPress: () => {
                browserCookies.erase('userid')
                this.props.logoutSubmit()
            }},
        ])



    }

    render() {
        const props = this.props
        console.log(props)
        const Item = List.Item
        const Brief = Item.Brief
        return props.user?(
                <div>
                    <Result
                        img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt=""/>}
                        title={props.user}
                        message={props.type=='professor'?props.Department:null}
                    />
                    <List renderHeader={()=>'Intro'}>
                        <Item
                            multipleLine
                        >
                            {props.title}
                            {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                            {props.number?<Brief>num：{props.number}</Brief>:null}
                        </Item>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <List>
                        <Item onClick={this.logout}>Logout</Item>
                    </List>
                </div>
        ):<Redirect to={props.redirectTo}/>
    }


}

export default User