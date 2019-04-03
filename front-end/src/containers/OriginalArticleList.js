import React,{Component} from 'react';
import Api from './../utils/Api';
import icon_like from '../imgs/icon_like.svg';
import icon_comment from '../imgs/icon_comment.svg';
import { List, Row, Col, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const {Item} = List;

class OriginalArticleList extends Component{
    constructor(){
        super();
        this.state = {
            data:[],
            loading:true,
            total:-1
        }
    }

    componentWillMount(){
        let newData = [];
        Api.getOriginalArticles({
            start:1,
            num:this.props.pageSize
        }).then(res=>{
            if(res.succeed){
                newData = this.normalizeData(res.data);
                const promiseList =  res.data.map(item=>{
                    return Api.getCommentsNum(item.oaid);
                });

                return Promise.all(promiseList)
            }
        }
        ).then(respondes=>{
            if(respondes){
                for(let i=0; i<respondes.length; i++){
                    newData[i].commentsNum = respondes[i].data
                }

                const promiseList2 = newData.map(item=>{
                    return Api.getLike(item.oaid);
                });

                return Promise.all(promiseList2);
            }
        }).then(respondes=>{
            if(respondes){
                for(let i=0; i<respondes.length; i++){
                    newData[i].likedNum = respondes[i].data
                }
                this.setState({
                    loading:false,
                    data:newData
                })
            }
        })

        Api.getOriginalArticlesNum().then(res=>{
            if(res.succeed){
                this.setState({
                    total:res.data
                })
            }
        })
    }

    normalizeData(data){
        return data.map(item=>{
            return {
                oaid:item.oaid,
                title:item.title,
                date:item.date.slice(0,10)
            }
        })
    }

    render(){

        const {loading,data,total} = this.state;
        const renderItem = (item)=>{
            return (
                <Item>
                    <Col span={24}>
                        <Row type='flex' justify='space-between'>
                                <Col><Link to={`/original/all-articles/${item.oaid}`}>{item.title}</Link></Col>
                                <Col>{item.date}</Col>
                        </Row>
                        <Row style={{margin:'8px 0',color:'rgba(0, 0, 0, .45)',fontSize:'0.8rem'}}>
                            <span>
                                <img alt='comment' src={icon_comment} style={{width:'0.8rem'}}/> {item.commentsNum}
                            </span>
                            <span style={{marginLeft:'0.8rem'}}>
                                <img alt='comment' src={icon_like} style={{width:'0.8rem'}}/> {item.likedNum}
                            </span>
                        </Row>
                    </Col>
                </Item>
            )
        }

        const pagnationConfig = {
            onChange:(page,pageSize)=>{
                let newData = [];
                Api.getOriginalArticles({
                    start:(page-1)*pageSize+1,
                    num:pageSize
                }).then(res=>{
                    if(res.succeed){
                        newData = this.normalizeData(res.data);
                        const promiseList =  res.data.map(item=>{
                            return Api.getCommentsNum(item.oaid);
                        });

                        return Promise.all(promiseList)
                    }
                }
                ).then(respondes=>{
                    if(respondes){
                        for(let i=0; i<respondes.length; i++){
                            newData[i].commentsNum = respondes[i].data
                        }
                        this.setState({
                            loading:false,
                            data:newData
                        })
                    }
                })
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
                                            locale={{emptyText:<Empty description='还没有原创文章'/>}}/>
        )
    }
    
}

OriginalArticleList.propTypes = {
    pageSize:PropTypes.number
}

export default OriginalArticleList;