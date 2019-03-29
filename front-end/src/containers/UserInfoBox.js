import React,{Component} from 'react';
import { Avatar,Badge , Menu, Popover} from 'antd';
import Api from '../utils/Api';
import {connect} from 'react-redux';
import createClearUnreadNumAction from '../actions/clearUnreadNum';
import createLogOutAction from '../actions/logOut';
import { Link } from 'react-router-dom';

class UserInfoBox extends Component{
    clearUnreadNum(){
        Api.clearUnreadNum();
    }

    render(){
        const popOverContent = (
            <Menu style={{border:'0px transparent solid'}}>
                <Menu.Item>
                    <Link to='/original_articles/messages'>
                        <span onClick={this.clearUnreadNum.bind(this)}>
                            我的消息（{this.props.unread_num}）
                        </span>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={this.props.onLogOut}>退出</span>
                </Menu.Item>
            </Menu>
        )

        return(
            <span>
                <Popover content={popOverContent} trigger='hover' placement="bottomRight">
                    <Badge count={this.props.unread_num}>
                        <Avatar style={{backgroundColor:'#f56a00'}}>{this.props.nickname}</Avatar>
                    </Badge>
                </Popover>
            </span>
        )
    }
}

function mapStateToProps(state){
    return {
        nickname:state.info.nickname,
        unread_num:state.info.unread_num
    }
}

function mapDispatchToProps(dispatch){
    return {
        clearUnreadNum:()=>{
            dispatch(createClearUnreadNumAction());
        },
        onLogOut:()=>{
            console.log('onLogOut');
            dispatch(createLogOutAction());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfoBox);