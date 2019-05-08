import React,{Component} from 'react';
import OriginalArticleContent from './../components/OriginalArticleContent';
import Api from './../utils/Api';
import { Spin, Divider, Row } from 'antd';
import CommentList from './CommentList';
import CommentEditor from './CommentEditor';
import { connect } from 'react-redux';
import createUpdateOAInfoAction from '../actions/updateOAInfo';

class OriginalArticleContentContainer extends Component{
    constructor(){
        super();
        this.state = {
            title:'',
            author_name:'',
            date:'',
            content:'',
            liked_num:0,
            loading:true,
            liked:false
        }
    }

    componentWillMount(){
        this.loadData();
        this.loadLike(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.loadLike(nextProps);
    }

    //加载文章内容、评论、回复
    loadData(){
        let newState;
        Api.getOriginalArticleContent(this.props.match.params.oaid).then(res=>{
            if(res.succeed){
                newState = res.data;
                newState.loading = false;
                this.setState(newState);
                this.props.updateOAInfo({
                    author:res.data.author,//author的uid
                    oaid:res.data.oaid,
                    title:res.data.title    
                })
            }
        })
    }

    //加载用户是否点赞以及文章的点赞数
    loadLike(props){
        const param = {
            oaid:props.match.params.oaid,
            uid:props.uid
        };

        Api.getUserDidLikeArticle(param).then(res=>{
            if(res.succeed){
                this.setState({
                    liked:res.data
                })
            }
        });

        Api.getLike(param.oaid).then(res=>{
            if(res.succeed){
                this.setState({
                    liked_num:Number(res.data)
                })
            }
        });
    }

    //点赞按钮触发的回调函数
    onClickLike(increase){
        const param = {
            oaid:this.props.match.params.oaid,
            owner:this.props.uid
        }

        if(increase === 1){
            Api.postLike(param).then(res=>{
                if(res.succeed){
                    const param1 = {
                        uid:this.state.author,
                        oaid:this.props.match.params.oaid,
                        title:`收到新点赞`,
                        content:`${this.props.nickname}点赞了您的文章《${this.state.title}》`
                    }
                    return Api.postNewMessage(param1)
                }
            }).then(res=>{
                //emptyBody
            }).catch(error=>{
                console.error('点赞失败');
            })
        }else{
            Api.deleteLike(param).then(()=>{
                //emptyBody
            }).catch(error=>{
                console.error('取消点赞失败');
            })
        }
    }    

    render(){
        const OriginalArticleContentProps = {
            title:this.state.title,
            author_name:this.state.author_name,
            date:this.state.date.slice(0,10),
            content:this.state.content,
            liked:this.state.liked,
            liked_num:this.state.liked_num,
            onClickLike:this.onClickLike.bind(this),
            hasLoggedIn:this.props.hasLoggedIn
        }

        return (
            <div>
                {this.state.loading?<Spin size='large'/>:<OriginalArticleContent {...OriginalArticleContentProps}/>}
                <Divider>全部评论</Divider>
                <CommentList oaid={this.props.match.params.oaid} pageSize={10}/>
                <Divider>我的评论</Divider>
                {this.props.hasLoggedIn?<CommentEditor oaid={this.props.match.params.oaid}/>:
                                        <Row type='flex' justify='center'>
                                            请先登录/注册
                                        </Row>}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        hasLoggedIn:state.user.hasLoggedIn,
        uid:state.user.uid,
        nickname:state.user.nickname
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateOAInfo:(newInfo)=>{
            dispatch(createUpdateOAInfoAction(newInfo))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OriginalArticleContentContainer);

