import React,{Component} from 'react';
import { List, Comment,Avatar } from 'antd';
import { PropTypes } from 'prop-types';
import Api from './../utils/Api';

const {Item} = List;

class ReplyList extends Component{
    constructor(){
        super()
        this.state = {
            loading:true,
            total:0,
            data:[]
        }
    }

    componentWillMount(){
        Api.getReplysNum(this.props.cid).then(res=>{
            if(res.succeed){
                this.setState({total:res.data});
            }
        });

        this.loadData(1,this.props.pageSize);
    }

    componentWillReceiveProps(props){
        Api.getReplysNum(props.cid).then(res=>{
            if(res.succeed){
                this.setState({total:res.data});
            }
        });

        this.loadData(1,this.props.pageSize);
    }

    loadData(start,num){
        Api.getReplys({
            cid:this.props.cid,
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
            const handleReplyOnClick = ()=>{
                this.props.onReplyItem(item.owner)
            }
            const replyProps = {
                author:item.reply_author,
                avatar:<Avatar style={{ backgroundColor: '#87d068' }}>{item.reply_author}</Avatar>,
                content:item.content,
                datetime:item.date_time,
                actions:[<span onClick={handleReplyOnClick}>回复</span>]
            }
            return <Item><Comment {...replyProps}/></Item>
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
            Number(total) === 0?null:<List split size='small' 
                                            dataSource={data} 
                                            loading={loading}  
                                            renderItem={renderItem}
                                            pagination={pagnationConfig}/>
        )
    }
}

ReplyList.propTypes = {
    cid:PropTypes.number,
    pageSize:PropTypes.number,
    onReplyItem:PropTypes.func
}

ReplyList.defaultProps = {
    pageSize:5
}

export default ReplyList