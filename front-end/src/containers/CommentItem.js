import React,{Component} from 'react';
import { Comment, Avatar, Col, message } from 'antd';
import ReplyList from './ReplyList';
import ReplyEditor from './ReplyEditor';
import Api from './../utils/Api';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class CommentItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            replyEditorResponder:props.owner,//评论编辑区的初始responder，也即评论作者的id
            showReplys:false,
            commentsNum:0
        }
    }

    componentWillMount(){
        this.loadData(this.props.cid,this.props.owner);
    }

    componentWillReceiveProps(props){
        this.setState({showReplys:false});
        this.loadData(props.cid,props.owner);
    }

    loadData(cid,owner){
        Api.getReplysNum(cid).then(res=>{
            if(res.succeed){
                this.setState({commentsNum:res.data});
            }
        });
    }

    changeShowReplys(){
        if(!this.props.hasLoggedIn){
            message.warning('登录之后才可以回复');
        }
        this.setState(prevState=>{
            return {
                showReplys: !prevState.showReplys
            }
        })
    }

    onReplyComment(commentOwner){
        if(this.props.hasLoggedIn){
            this.setState({
                replyEditorResponder:commentOwner
            })
        }else{
            message.warning('登录之后才可以回复');
        }

    }

    render(){
        const commentProps = {
            author:this.props.author,
            avatar:<Avatar style={{backgroundColor:'#f56a00'}}>{this.props.author}</Avatar>,
            datetime:this.props.date_time,
            content:this.props.content,
            actions:[<span onClick={this.changeShowReplys.bind(this)}>回复({this.state.commentsNum})</span>]
        }
        const commentArea = (
                <Col style={{width:600}}>
                    <ReplyList cid={this.props.cid}
                                onReplyItem={this.onReplyComment.bind(this)}/>
                    {this.props.hasLoggedIn?<ReplyEditor responder={this.state.replyEditorResponder}
                                    cid={this.props.cid}/>:null}
                </Col>
        );
        return(
            <Comment {...commentProps}>
                {this.state.showReplys?commentArea:null}
            </Comment>
        )
    }
}

CommentItem.propTypes = {
    cid:PropTypes.number,
    owner:PropTypes.number,
    date_time:PropTypes.string,
    content:PropTypes.string,
    hasLoggedIn:PropTypes.bool
}

const mapStateToProps = state=>{
    return {
        hasLoggedIn:state.user.hasLoggedIn,
    }
}

export default connect(mapStateToProps)(CommentItem);