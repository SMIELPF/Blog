import React,{Component} from 'react';
import {Divider,Icon, message}from 'antd'
import { PropTypes } from 'prop-types';

class OriginalArticleContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            liked: props.liked,//用户有没有点赞
            liked_num:props.liked_num//点赞数
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            liked: nextProps.liked,
            liked_num:nextProps.liked_num
        })
    }

    handleOnClickLike(){
        if(this.props.hasLoggedIn){
            if(this.state.liked){
                //已经点过赞
                this.setState(prevState=>{
                    return {
                        liked:false,
                        liked_num:prevState.liked_num - 1
                    }
                })
                //点赞数减一
                this.props.onClickLike(-1);
            }else{
                //没有点赞
                this.setState(prevState=>{
                    return {
                        liked:true,
                        liked_num:prevState.liked_num + 1
                    }
                })
                //点赞数加一
                this.props.onClickLike(1);
            }
        }else{
            message.warn('登录后才可以点赞');
        }
    }

    render(){
        const {title,author_name,date,content} = this.props;
        return (
            <div>
                <h1>{title}</h1>
                <Divider type='horizontal' orientation='left'><span>{author_name}</span></Divider>
                <article className='markdown-body'
                         style={{margin:'16px 48px',minHeight:400}}
                         dangerouslySetInnerHTML={{__html:content}}>
                </article>
                <Divider type='horizontal' orientation='right'><span>{date.slice(0,10)}</span></Divider>
                <div style={{margin:'16px 48px'}}><Icon onClick={this.handleOnClickLike.bind(this)} type="like" theme={this.state.liked?'filled':'outlined'}/> 
                    {this.state.liked_num} 喜欢
                </div>
            </div>
    );

    }
}

OriginalArticleContent.defaultProps = {
    title:'标题',
    author_name:'作者',
    date:'日期',
    content:'内容',
    liked_num:0,
    liked:false,
    hasLoggedIn:false
}

OriginalArticleContent.propTypes = {
    onClickLike:PropTypes.func
}

export default OriginalArticleContent;