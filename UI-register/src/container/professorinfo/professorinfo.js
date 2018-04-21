import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from '../../conponent/avatar-selector/avatar-selecto'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
@connect(
  state=>state.user,
	{update}
)
class ProfessorInfo extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        title:'',
        desc:'',
        Department:'',
        number:''
      }
    }
    onChange(key,val){
  		this.setState({
  			[key]:val
  		})
	   }

    render(){
      const path = this.props.location.pathname
      const redirect = this.props.redirectTo
      return (
        <div>
          {redirect&&redirect!== path? <Redirect to={this.props.redirectTo}></Redirect> :null}
          <NavBar mode="dark" >Professor Info Page</NavBar>
          <AvatarSelector
            selectAvatar={(imgname)=>{
              this.setState({
                avatar:imgname
              })
            }}
          ></AvatarSelector>
          <InputItem onChange={(v)=>this.onChange('title',v)}>Title</InputItem>
				  <InputItem onChange={(v)=>this.onChange('Department',v)}>Department</InputItem>
				  <InputItem onChange={(v)=>this.onChange('number',v)}>number</InputItem>
  				<TextareaItem
  					onChange={(v)=>this.onChange('desc',v)}
  					rows={3}
  					autoHeight
  					title='need'
  				>
  				</TextareaItem>
  				<Button
  					onClick={()=>{
  						this.props.update(this.state)
  					}}
  					type='primary'>Save</Button>
          </div>
        )
    }
}

export default ProfessorInfo
