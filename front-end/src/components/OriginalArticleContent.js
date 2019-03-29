import React,{Component} from 'react';
import {Divider,Icon}from 'antd'
import { PropTypes } from 'prop-types';

class OriginalArticleContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            liked: false,//用户有没有点赞
            likedNum:props.likedNum//点赞数
        }
    }

    handleOnClickLike(){
        if(this.state.liked){
            //已经点过赞
            this.setState(prevState=>{
                return {
                    liked:false,
                    likedNum:prevState.likedNum - 1
                }
            })
            //点赞数减一
            this.props.onClickLike(-1);
        }else{
            //没有点赞
            this.setState(prevState=>{
                return {
                    liked:true,
                    likedNum:prevState.likedNum + 1
                }
            })
            //点赞数加一
            this.props.onClickLike(1);
        }
    }

    render(){
        const {title,author,date,content} = this.props;
        return (
            <div>
                <h1>{title}</h1>
                <Divider type='horizontal' orientation='left'><span>{author}</span></Divider>
                <article className='markdown-body'
                         style={{margin:'16px 48px',minHeight:400}}
                         dangerouslySetInnerHTML={{__html:{content}}}>
                </article>
                <Divider type='horizontal' orientation='right'><span>{date}</span></Divider>
                <div style={{margin:'16px 48px'}}><Icon type="like" theme={this.state.liked?'filled':'outlined'}/> 
                    {this.state.likedNum} 喜欢
                </div>
            </div>
    );

    }
}

OriginalArticleContent.defaultProps = {
    title:'标题',
    original_link:'#',
    author:'作者',
    date:'日期',
    content:'内容',
    likedNum:0
}

OriginalArticleContent.propTypes = {
    onClickLike:PropTypes.func
}

export default OriginalArticleContent;