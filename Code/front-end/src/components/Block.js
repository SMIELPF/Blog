import React from 'react';
import { Layout,Menu } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';

const {Sider,Content} = Layout;
const {Item} = Menu;

const Block = (props)=>{
    const MenuItem = props.itemList.map(item=>{
        let linkText = item.text;
        return <Item key={item.text}>
                    <Link to={item.url}>
                        {linkText}
                    </Link>
                </Item>
    })

    const MenuRoute = props.itemList.map(item=>{
        return <Route key={item.text} path={item.url}>
                    <Menu theme='dark' selectedKeys={[item.text]}>{MenuItem}</Menu>
               </Route>
    })

    const contentRoute = props.itemList.map(item=>{
        const exact = item.url === '/';
        return <Route key={item.text} exact={exact} path={item.url} render={item.render}></Route>
    })
    return (
        <Layout style={{minHeight:600}}>
            <Sider>
                <Switch>
                    { MenuRoute }
                </Switch>
            </Sider>
            <Content style={{margin:'16px'}}>
                <Switch>
                    { contentRoute }
                </Switch>
            </Content>
        </Layout>
    )
}

Block.defaultProps = {
    itemList:[
        {
            text:'text',
            url:'#',
            render:()=><div>component</div>    
        }
    ]
}

export default Block;