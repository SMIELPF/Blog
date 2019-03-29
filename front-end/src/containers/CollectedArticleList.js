import React,{Component} from 'react';
import {List,Icon, message}from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Api from '../utils/Api'

const {Item} = List;

class CollectedArticleList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            loading:true,
            total:0
        }
    }

    componentWillMount(){
        Api.getCollectedArticles({
            tag:this.props.tag,
            start:1,
            num:this.props.pageSize
        }).then(res=>{
            if(res.succeed){
                const data = this.normalizeData(res.data);
                this.setState({data:data,loading:false});

            }else{
                message.error('获取文章列表失败');
            }
        }
        )

        if(this.props.showPagnation){
            Api.getCollectedArticlesNum(this.props.tag).then(res=>{
                if(res.succeed){
                    this.setState({total:Number(res.data)});
                }
            })
        }
    }

    normalizeData(data){
        return data.map(item=>{
            return {
                ...item,
                url:this.props.baseUrl+'/'+item.caid,
                date:item.date.slice(0,10)
            }
        })
    }


    render(){
        const {data,loading} = this.state
        const renderItem = (item)=>{
            return (
                <Item>
                    <Icon type="read" style={{transform:'translate(0,25%)'}}/>
                    <div style={{
                                    margin:'0 8px',
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between'
                                    }}>
                        <Link to={item.url}>{item.title}</Link>
                        <span>{item.date}</span>
                    </div>
                </Item>
            )
        }

        const pagnationConfig = {
            onChange:(page,pageSize)=>{
                Api.getCollectedArticles({
                    tag:this.props.tag,
                    start:(page-1)*pageSize+1,
                    num:pageSize
                }).then(res=>{
                    if(res.succeed){
                        const data = this.normalizeData(res.data);
                        this.setState({loading:false,data:data})
                    }
                });
            },
            hideOnSinglePage:false,
            total:this.state.total,
            pageSize:this.props.pageSize
        }
        return (
            <List split size='small' 
                  dataSource={data} 
                  loading={loading}  
                  renderItem={renderItem}
                  pagination={this.props.showPagnation?pagnationConfig:null}/>
        )
    }
}

CollectedArticleList.propTypes = {
    baseUrl:PropTypes.string.isRequired,
    tag:PropTypes.string.isRequired,
    pageSize:PropTypes.number,
    showPagnation:PropTypes.bool
}

CollectedArticleList.defaultProps = {
    pageSize:6,
    baseUrl:'#',
    tag:'javaScript',
    showPagnation:false
}

export default CollectedArticleList;