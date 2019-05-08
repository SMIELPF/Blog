import React,{Component} from 'react';
import Navigator from './../components/Navigator';
import {Layout,Row,Col, Divider} from 'antd';
import Main from './Main';
import HeaderContent from './HeaderContent';
import icon_github from '../imgs/icon_github.svg';
import icon_sf from '../imgs/icon_sf.svg';
import icon_js from '../imgs/icon_js.svg';

const {Header,Content,Footer} = Layout 

class App extends Component{
    render(){
        return(
            <Layout style={{backgroundColor:'#003366'}}>
                <Header>
                    <HeaderContent/>
                </Header>
                <Content>
                    <Row type='flex' justify='center' style={{height:'100px'}}>
                        <Col span={20}>
                            TODO
                        </Col>
                    </Row>
                    <Row type='flex' justify='center'>
                        <Col span={20}>
                            <Row>
                                <Navigator/>
                            </Row>
                            <Row >
                                <Main/>
                            </Row>
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    <Row type='flex' justify='center' gutter={128}>
                        <Col>
                            <a href='https://github.com/SMIELPF'>
                                <img style={{width:'32px'}} src={icon_github} alt='github个人主页'></img>
                            </a>
                        </Col>
                        <Col>
                            <a href='https://segmentfault.com/u/run_nan'>
                                <img style={{width:'32px'}} src={icon_sf} alt='segmentFault个人主页'></img>
                            </a>
                        </Col>
                        <Col>
                            <a href='https://www.jianshu.com/u/1c3267ec57fb'>
                                <img style={{width:'32px'}} src={icon_js} alt='简书个人主页'></img>
                            </a>
                        </Col>
                    </Row>
                    <Divider>欢迎访问</Divider>
                    <Row type='flex' justify='center' style={{marginTop:'32px'}}>
                        <Col>
                            电话:（+86）18138740037<br/>
                            邮箱：1608272694@qq.com
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        )
    }
}

export default App;