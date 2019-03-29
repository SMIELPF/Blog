import React,{Component} from 'react'
import {Switch,Route,withRouter} from 'react-router-dom'
import CollectedArticleSection from './CollectedArticleSection';
import Block from '../components/Block';

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
            ]
        }

        const frontEndBlock = ()=><Block itemList={itemList.frontEnd}/>;

        return (
            <Switch>
                <Route path='/front-end' render={frontEndBlock}></Route>
            </Switch>
        );
    }
}




export default Main;