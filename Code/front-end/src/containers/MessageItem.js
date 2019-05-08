import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row , Badge} from 'antd';
import Api from './../utils/Api';
import createUpdateUnreadNumAction from './../actions/updateUnreadNum';
import { connect } from 'react-redux';

class MessageItem extends Component{

    onClickView(){
        if(this.props.unread){
            Api.putMessageStatus(this.props.mid).then(res=>{
                //emptyBody
                this.props.updateUnreadNum();
            })
        }
    }

    render(){
        return(
            <Row style={{width:'100%'}}>  
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span>
                        <h4 style={{margin:'0px'}}>{this.props.title}</h4>
                    </span>
                    <span>
                        {
                            this.props.date_time.slice(0,10) + ' ' + this.props.date_time.slice(11,19)
                        }
                    </span>
                </div>
                <Row style={{margin:'16px'}}>
                    {this.props.content}
                </Row>
                <Row>
                    <Link to={`/original/all-articles/${this.props.oaid}`}>
                        <span onClick={this.onClickView.bind(this)}>
                            <Badge dot={this.props.unread}>查看</Badge>
                        </span>
                    </Link>
                </Row>
            </Row>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateUnreadNum:()=>{
            dispatch(createUpdateUnreadNumAction());
        }
    }
}

export default connect(null,mapDispatchToProps)(MessageItem);