import React,{Component} from 'react';
import { Avatar,Badge , Menu, Popover} from 'antd';
import {connect} from 'react-redux';
import createLogOutAction from '../actions/logOut';
import { Link } from 'react-router-dom';

class UserInfoBox extends Component{

    render(){
        const popOverContent = (
            <Menu style={{border:'0px transparent solid'}}>
                <Menu.Item>
                    <Link to='/original/messages'>
                        <span>
                            我的消息（{this.props.unread_num}）
                        </span>
                    </Link>
                </Menu.Item>
                <Menu.Item onClick={this.props.onLogOut}>
                    <span>退出</span>
                </Menu.Item>
            </Menu>
        )

        return(
            <span>
                <Popover content={popOverContent} trigger='hover' placement="bottomRight">
                    <Badge count={this.props.unread_num}>
                        <Avatar style={{backgroundColor:'#00a2ae'}}>{this.props.nickname}</Avatar>
                    </Badge>
                </Popover>
            </span>
        )
    }
}

function mapStateToProps(state){
    return {
        uid:state.user.uid,
        nickname:state.user.nickname,
        unread_num:state.user.unread_num
    }
}

function mapDispatchToProps(dispatch){
    return {
        onLogOut:()=>{
            dispatch(createLogOutAction());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfoBox); 