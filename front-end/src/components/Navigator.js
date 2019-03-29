import React from 'react';
import { Menu } from 'antd';
import {Link, Switch, Route} from 'react-router-dom';

const {Item} = Menu;

//导航栏
const Nav = (props)=>{
    return (
        <Menu mode='horizontal' selectedKeys={[props.selected]}>
            <Item key='index'><Link to='/'>首页</Link></Item>
            <Item key='front-end'><Link to='/front-end/javaScript'>前端</Link></Item>
            <Item key='server'><Link to='/server/java'>服务端</Link></Item>
            <Item key='database'><Link to='/database/mySql'>数据库</Link></Item>
            <Item key='others'><Link to='/others/algorithm'>其他</Link></Item>
            <Item key='original'><Link to='/original/all-articles'>原创</Link></Item>
        </Menu>
    )
}

//根据前端路由渲染不同被选项的导航栏
const Navigator = ()=>{
    return(
        <Switch>
            <Route path='/front-end' render={()=><Nav selected='front-end'/>}></Route>
            <Route path='/server' render={()=><Nav selected='server'/>}></Route>
            <Route path='/database' render={()=><Nav selected='database'/>}></Route>
            <Route path='/others' render={()=><Nav selected='others'/>}></Route>
            <Route path='/original' render={()=><Nav selected='original'/>}></Route>
            <Route path='/' render={()=><Nav selected='index'/>}></Route>
        </Switch>
    )
}

export default Navigator;