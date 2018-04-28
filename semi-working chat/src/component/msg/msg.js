import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
@connect(
  state=>state
)
class Msg extends React.Component{
  getLast(arr){
      return arr[arr.length-1]
  }
  render(){
    //group by chatid

    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last-a_last
    })

    return(
      <div>
          {chatList.map(v=>{
            const LastItem = this.getLast(v)
            const targetId = v[0].from==userid?v[0].to:v[0].from
            const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
            if (!this.props.chat.users[targetId]){
              return null;
            }
            const name = this.props.chat.users[targetId] ? this.props.chat.users[targetId].name : ''
            const avatar = this.props.chat.users[targetId] ? this.props.chat.users[targetId].avatar :''
            return (
            <List key={LastItem._id}>
            <Item
              extra={<Badge text={unreadNum}></Badge>}
              thumb={require(`../img/${avatar}.png`)}
              arrow="horizontal"
              onClick={()=>{
                this.props.history.push(`/chat/${targetId}`)
              }}
            >
              {LastItem.content}
              <Brief>{name}</Brief>

            </Item>
            </List>
          )
          })}
      </div>
    )
  }
}

export default Msg
