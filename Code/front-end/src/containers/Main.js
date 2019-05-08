import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import CollectedArticleSection from './CollectedArticleSection';
import Block from '../components/Block';
import OriginalArticleSection from './OriginalArticleSection';
import MessageList from './MessageList';

class Main extends Component{
    render(){
        const itemList = {
            frontEnd:[
                {
                    text:'React',
                    url:'/front-end/react',
                    render:()=><CollectedArticleSection tag='react' path='/front-end/React'/>
                },
                {
                    text:'javaScript',
                    url:'/front-end/javaScript',
                    render:()=><CollectedArticleSection tag='javaScript' path='/front-end/javaScript'/>
                },
                {
                    text:'node',
                    url:'/front-end/node',
                    render:()=><CollectedArticleSection tag='node' path='/front-end/node'/>
                }
            ],
            original:[
                {
                    text:'文章',
                    url:'/original/all-articles',
                    render:()=><OriginalArticleSection/>
                },
                {
                    text:'消息',
                    url:'/original/messages',
                    render:()=><MessageList/>
                }
            ]
        }

        const frontEndBlock = ()=><Block itemList={itemList.frontEnd}/>;
        const originalBlock = ()=><Block itemList={itemList.original}/>

        return (
            <div style={{marginBottom:'50px'}}>
                <Switch>
                    <Route path='/front-end' render={frontEndBlock}/>
                    <Route path='/original' render={originalBlock}/>
                </Switch>
            </div>
        );
    }
}




export default Main;