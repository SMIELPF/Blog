import React,{Component} from 'react';
import LogInBox from './LogInBox';
import UserInfoBox from './UserInfoBox';
import { Row,Col } from 'antd';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import createLogInAction from './../actions/logIn';
import createInitialUnreadNumAction from '../actions/initialUnreadNum';
import Api from './../utils/Api';

class HeaderContent extends Component{
    componentWillMount(){
        let info = localStorage.getItem('userInfo');
        if(info){
            info = JSON.parse(info);
            this.props.onGetInfoFromStorage(info);
            
            //获取最新的未读消息数
            Api.getUserUnreadNum(info.uid).then(res=>{
                if(res.succeed){
                    this.props.onGetUnreadNum(res.data);
                }
            })
        }
    }

    render(){
        return(
            <Row type='flex' justify='space-between' align='middle' style={{height:'100%'}}>
                <Col style={{height:'100%'}}>
                    <Link to='/'><h2 style={{color:'white'}}>Philip Lau's site</h2></Link>
                </Col>
                <Col>
                    {this.props.hasLoggedIn?<UserInfoBox/>:<LogInBox/>}
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state){
    return {
        hasLoggedIn:state.user.hasLoggedIn
    }
}

function mapDispatchToProps(dispatch){
    return {
        onGetInfoFromStorage:(info)=>{
            dispatch(createLogInAction(info));
        },
        onGetUnreadNum:(num)=>{
            dispatch(createInitialUnreadNumAction(num));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderContent);
