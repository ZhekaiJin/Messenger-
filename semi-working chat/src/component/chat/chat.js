import React from 'react'
import io from 'socket.io-client'
import {List, InputItem, NavBar, Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
const socket = io('ws://localhost:9093')//connect sockets
@connect(
    state =>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
    constructor(props) {
        super(props)
        this.state={text:'',msg:[]}
    }
    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
          this.props.getMsgList()
          this.props.recvMsg()
        }
     }
     componentWillUnmount(){
       const to = this.props.match.params.user
       this.props.readMsg(to)
     }
    fixCarousel(){
      setTimeout(function(){
        window.dispatchEvent(new Event('resize'))
      },0)
    }
    handleSubmit() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
            text:'',
            showEmoji:false
          }) // clear data
    }
    render() {
        const emoji="😀 🍐 🍑 🍒 🍓 🥝 🍅 🥥 🥑 🍆 🥔 🥕 🌽 🌶 🥒 🥦 🍄 🥜 🌰 🍞 🥐 🥖 🥨 🥞 🧀 🍖 🍗 🥩 🥓 🍔 🍟 🍕 🌭 🥪 🌮 🌯 🍳 🍲 🥣 🥗 🍿 🥫 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🍢 🍣 🍤 🍥 🍡 🥟 🥠 🥡 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🥧 🍫 🍬 🍭 🍮 🍯 🍼 🥛 ☕ 🍵 🍶 🍾 🍷 🍸 🍹 🍻 🥂 🥃 🥤 🥢 🍽 🍴 🥄 "
                    .split(' ')
                    .filter(v=>v)
                    .map(v=>({text:v}))
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
          return null
        }
        const chatId= getChatId(userid, this.props.user._id)
        console.log(chatId)
        console.log(this.props.chat.chatmsg)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatId)
        return (
            <div id='chat-page'>
                <NavBar
                  mode="dark"
                  icon={<Icon type="left" />}
                  onLeftClick = {()=>{
                    this.props.history.goBack()
                  }}
                >
                    {users[userid].name}
                </NavBar>


                {chatmsgs.map(v =>{
                    if(!users[v.from].avatar){
                      var avatar = require(`../img/${users[v.from].avatar}.png`)
                    }else{
                      var avatar = require(`../img/${users[v.from].avatar}.png`)
                    }
                    return v.from == userid?(
                        <List key={v._id}>
                          <Item
                            thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id}>
                          <Item className='chat-me'extra={<img src={avatar}/>}>{v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='Please Type'
                            value={this.state.text}
                            onChange={v=>{
                            this.setState({text:v})
                        }}
                            extra={
                              <div>
                              <span
                                sytle={{marginRight:15}}
                                onClick={()=>{
                                  this.setState({
                                  showEmoji:!this.state.showEmoji
                                  })
                                  this.fixCarousel()
                                }}
                              >😀</span>
                              <span onClick={()=>this.handleSubmit()}>Send</span>
                               </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {this.state.showEmoji?<Grid
                      data={emoji}
                      columnNum={9}
                      carouselMaxRow={4}
                      isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text:this.state.text+el.text
                            })
                        }
                      }
                    />:null}
                </div>
            </div>
        )
    }
}

export default Chat
