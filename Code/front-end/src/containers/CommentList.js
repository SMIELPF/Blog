import React,{Component} from 'react';
import { List, Empty } from 'antd';
import { PropTypes } from 'prop-types';
import Api from './../utils/Api';
import CommentItem from './CommentItem';

const {Item} = List;

class CommentList extends Component{
    constructor(){
        super()
        this.state = {
            loading:true,
            total:-1,
            data:[]
        }
    }

    componentWillMount(){
        Api.getCommentsNum(this.props.oaid).then(res=>{
            if(res.succeed){
                this.setState({total:res.data});
            }
        });

        this.loadData(1,this.props.pageSize);
    }

    componentWillReceiveProps(props){
        Api.getCommentsNum(props.oaid).then(res=>{
            if(res.succeed){
                this.setState({total:res.data});
            }
        });

        this.loadData(1,this.props.pageSize);
    }

    loadData(start,num){
        Api.getComments({
            oaid:this.props.oaid,
            start:start,
            num:num
        }).then(res=>{
            if(res.succeed){
                this.setState({
                    loading:false,
                    data:this.normalizeData(res.data)
                })
            }
        })
    }

    normalizeData(data){
        for(let i=0; i<data.length; i++){
            const date = data[i].date_time.slice(0,10);
            const time = data[i].date_time.slice(11,19);
            data[i].date_time = date + ' ' + time;
        }
        return data;
    }

    render(){
        const {loading,data,total} = this.state;
        const renderItem = item=>{
            return (
                <Item>
                    <CommentItem cid={item.cid} owner={item.owner} 
                                 date_time={item.date_time} content={item.content}
                                 author={item.comment_author}/>
                </Item>
            )
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
                                            locale={{emptyText:<Empty description='还没有评论哦，快来抢沙发吧~'/>}}/>
        )
    }
}

CommentList.propTypes = {
    oaid:PropTypes.string,
    pageSize:PropTypes.number
}

export default CommentList;
