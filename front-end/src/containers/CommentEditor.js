import React,{Component} from 'react'
import {Input,Avatar,Button,Comment,message} from 'antd';
import Api from './../utils/Api';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const {TextArea} = Input;

class CommentEditor extends Component{

    constructor(){
        super();
        this.state = {
            loading:false,
            content:''
        }
    }

    handleOnChange(e){
        if(e.target.value.length >= 400){
            message.warn('评论不能超过400字');
        }else{
            this.setState({
                content:e.target.value
            })
        }
    }

    handleOnclick(){
        if(this.state.content !== ''){
            this.setState({
                loading:true
            })
            const {owner,oaid} = this.props;
            const content = this.state.content;
            const body = {
                owner:owner,
                content:content
            }
            Api.postComment(oaid,body).then(res=>{
                if(res.succeed){
                    //通知文章作者有新评论
                    const param = {
                        uid:this.props.articleAuthor,//要通知的对象：文章作者
                        oaid:this.props.oaid,
                        title:`${this.props.nickname}评论了您的文章《${this.props.articleTitle}》`,
                        content:body.content
                    }
                    Api.postNewMessage(param).then(res=>{
                        if(res.succeed){
                            this.setState({
                                content:'',
                                loading:false
                            });
                            message.success('评论成功,刷新页面后可见');
                        }
                    })
                }else{
                    message.error('评论失败');
                }
            })
        }else{
            message.warning('评论内容不能为空');
        }
        
    }

    render(){
        const props = {
            author:this.props.nickname,
            avatar:<Avatar style={{ backgroundColor: '#00a2ae' }}>{this.props.nickname}</Avatar>,
            content:<TextArea style={{height:150}} onChange={this.handleOnChange.bind(this)} value={this.state.content}/>,
            actions:[<Button type='primary' onClick={this.handleOnclick.bind(this)} loading={this.state.loading}>评论</Button>]
        }
        return <Comment {...props}/>
    }
}

CommentEditor.propTypes = {
    nickname:PropTypes.string,//从store获取
    owner:PropTypes.number,//从store获取
    articleAuthor:PropTypes.number,//从store中获取
    articleTitle:PropTypes.string,//从store中获取
    oaid:PropTypes.string
}

CommentEditor.defaultProps = {
    nickname:'test',
    owner:1,
    oaid:1
}

const mapStateToProps = state=>{
    return {
        nickname:state.user.nickname,
        owner:state.user.uid,
        articleAuthor:state.originalArticle.author,
        articleTitle:state.originalArticle.title
    }
}

export default connect(mapStateToProps,null)(CommentEditor);