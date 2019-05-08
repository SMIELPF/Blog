import React,{Component} from 'react'
import {Input,Avatar,Button,Comment,message} from 'antd';
import Api from './../utils/Api';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const {TextArea} = Input;

class ReplyEditor extends Component{
    constructor(){
        super();
        this.state = {
            content:'',
            loading:false
        }
    }

    componentWillMount(){
        //记录初始responder,即评论所在回复的楼主
        this.initialResponder = this.props.responder;
        //使当前responder也为评论所在回复的楼主
        this.currentResponder = this.props.responder;
    }

    componentWillReceiveProps(nextProps){
        Api.getUserInfo(nextProps.responder)
            .then(res=>{
                if(res.succeed){
                    //使当前responder为传入的新responder
                    this.currentResponder = nextProps.responder;
                    this.setState({
                        content:`回复 @${res.data.nickname}： `
                    })
                }
            })
        
    }

    handleOnChange(e){
        if(e.target.value.length >= 200){
            message.warn('评论不能超过200字');
        }else{
            this.setState({
                content:e.target.value
            })
        }

        if(e.target.value.length === 0){
            this.currentResponder = this.initialResponder;
        }
    }

    handleOnclick(){
        if(this.state.content !== ''){
            this.setState({
                loading:true
            })
            const {owner,cid} = this.props;
            const content = this.state.content;
            const body = {
                responder:this.currentResponder,
                owner:owner,
                content:content
            }

            //发布回复
            Api.postReply(cid,body).then(res=>{
                if(res.succeed){
                    //清空回复区内容
                    this.setState({
                        content:'',
                        loading:false
                    });
                    message.success('评论成功，刷新页面后可见',3);
                    //评论完后把当前responder修改回评论所在回复的楼主
                    this.currentResponder = this.initialResponder;
                }else{
                    console.error('评论发表失败');
                }     
            });

            //通知被回复者
            const param1 = {
                uid:this.currentResponder,
                oaid:this.props.oaid,
                title:`${this.props.nickname}回复了您`,
                content:body.content
            }
            Api.postNewMessage(param1).then(res=>{
                if(!res.succeed){
                    console.error('通知被回复者失败')
                }
            });

            //当被回复者不是评论作者时，通知评论作者
            if(this.currentResponder !== this.initialResponder){
                const param2 = {
                    uid:this.initialResponder,
                    oaid:this.props.oaid,
                    title:`${this.props.nickname}在您发表的评论下进行了回复`,
                    content:body.content
                }
                Api.postNewMessage(param2).then(res=>{
                    if(!res.succeed){
                        console.error('通知评论作者失败')
                    }
                })
            }

            //当文章作者既不是被回复者，也不是评论作者时，通知文章作者
            if(this.props.articleAuthor !== this.initialResponder && this.props.articleAuthor !== body.responder){
                const params3 = {
                    uid:this.props.articleAuthor,
                    oaid:this.props.oaid,
                    title:`${this.props.nickname}在您发布的文章《${this.props.articleTitle}》下进行了回复`,
                    content:body.content
                }
                Api.postNewMessage(params3).then(res=>{
                    if(!res.succeed){
                        console.error('通知文章作者失败')
                    }
                })
            }


        }else{
            message.warning('评论内容不能为空')
        }
        
    }

    render(){
        const props = {
            avatar:<Avatar style={{ backgroundColor: '#00a2ae' }}>{this.props.nickname}</Avatar>,
            content:<TextArea onChange={this.handleOnChange.bind(this)} value={this.state.content}/>,
            actions:[<Button type='primary' onClick={this.handleOnclick.bind(this)} loading={this.state.loading}>回复</Button>]
        }
        return <Comment {...props}/>
    }
}

ReplyEditor.propTypes = {
    responder:PropTypes.number,
    owner:PropTypes.number,//回复者的id，从store中获取
    cid:PropTypes.number,
    nickname:PropTypes.string//回复者的名字，从store中获取
}

const mapStateToProps = state=>{
    return {
        nickname:state.user.nickname,
        owner:state.user.uid,
        oaid:state.originalArticle.oaid,
        articleTitle:state.originalArticle.title,
        articleAuthor:state.originalArticle.author
    }
}

export default connect(mapStateToProps,null)(ReplyEditor);