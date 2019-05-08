import React, {Component} from 'react';
import MessageItem from './MessageItem';
import Api from './../utils/Api';
import {List, Empty} from 'antd';
import { connect } from 'react-redux';

const {Item} = List;

class MessageList extends Component{
    constructor(){
        super()
        this.state = {
            loading:true,
            total:-1,
            data:[]
        }
    }

    componentWillMount(){
        Api.getUserMessagesNum(this.props.uid).then(res=>{
            if(res.succeed){
                this.setState({
                    total:res.data
                })
            }
        });

        this.loadData(this.props,1,this.props.pageSize);

    }

    componentWillReceiveProps(nextProps){
        Api.getUserMessagesNum(nextProps.uid).then(res=>{
            if(res.succeed){
                this.setState({
                    total:res.data
                })
            }
        });
        this.loadData(nextProps,1,this.props.pageSize);
    }

    loadData(props,start,num){
        Api.getUserMessages({
            uid:props.uid,
            start,
            num
        }).then(res=>{
            if(res.succeed){
                this.setState({
                    loading:false,
                    data:res.data
                })
            }
        })
    }

    render(){
        const {loading,data,total} = this.state;
        const renderItem = item=>{
            return <Item><MessageItem {...item}/></Item>
        }

        const pagnationConfig = {
            onChange:(page,pageSize)=>{
                this.loadData((page-1)*pageSize+1,pageSize)
            },
            hideOnSinglePage:true,
            total:Number(total),
            pageSize:this.props.pageSize
        }
        return (
            Number(total) === -1?null:<List split size='small' 
                                            dataSource={data} 
                                            loading={loading}  
                                            renderItem={renderItem}
                                            pagination={pagnationConfig}
                                            locale={{emptyText:<Empty description='还没有消息哦~'/>}}/>
        )
    }
}

MessageList.defaultProps = {
    pageSize:10
}

function mapStateToProps(state){
    return {
        uid:state.user.uid
    }
}

export default connect(mapStateToProps)(MessageList);
