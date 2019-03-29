import React,{Component} from 'react';
import CollectedArticleContent from './../components/CollectedArticleContent';
import Api from './../utils/Api';
import { Spin } from 'antd';

class CollectedArticleContentContainer extends Component{
    constructor(){
        super();
        this.state = {
            title:'',
            original_link:'',
            author:'',
            date:'',
            content:'',
            loading:true
        }
    }

    componentWillMount(){
        this.loadData();
    }

    loadData(){
        Api.getCollectedArticleContent(this.props.match.params.oaid).then(res=>{
            if(res.succeed){
                this.setState({
                    title:res.data.title,
                    original_link:res.data.original_link,
                    author:res.data.author,
                    date:res.data.date.slice(0,10),
                    content:res.data.content,
                    loading:false
                })
            }
        })
    }

    render(){
        const ArticleContentProps = {
            title:this.state.title,
            author:this.state.author,
            date:this.state.date,
            content:this.state.content,
            original_link:this.state.original_link
        }
        return (
            this.state.loading?<Spin size='large'></Spin>:<CollectedArticleContent {...ArticleContentProps}/>
        );
    }
}

export default CollectedArticleContentContainer;