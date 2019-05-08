import React from 'react';
import {Divider}from 'antd'

const CollectedArticleContent = (props)=>{
    const {title,author,date,content,original_link} = props;
    return (
        <div>
            <h1>{title}</h1>
            <span>原文链接：<a href={original_link}>{original_link}</a></span>
            <Divider type='horizontal' orientation='left'><span>{author}</span></Divider>
            <article  className='markdown-body'
                      style={{margin:'16px 48px',minHeight:400}}
                      dangerouslySetInnerHTML={{__html:content}}>
            </article>
            <Divider type='horizontal' orientation='right'><span>{date}</span></Divider>
        </div>
    );
}

CollectedArticleContent.defaultProps = {
    title:'标题',
    original_link:'#',
    author:'作者',
    date:'日期',
    content:'内容'
}

export default CollectedArticleContent;