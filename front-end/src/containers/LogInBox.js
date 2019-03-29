import React,{Component} from 'react';
import { Form, Button, Icon, Input, message } from 'antd';
import Api from '../utils/Api';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {connect} from 'react-redux';
import createlogInAction from '../actions/logIn';


class LogInBox extends Component{
    
    componentDidMount() {
        //组件挂载后，使登陆按钮不可用
        this.props.form.validateFields();
      }
    
    handleSubmit = (e) => {
        e.preventDefault();//不提交表单，提交json
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Api.postLogInInfo(values)
                    .then(res=>{
                        if(res.succeed){
                            //登录成功，更新store中的用户信息
                            this.props.setInfo(res.data);
                            //更新localStorage
                            localStorage.setItem('userInfo',JSON.stringify(res.data));
                        }else{
                            message.warn(res.message);
                        }
                    })
            }else{
                alert(err);
            }
        });
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    render(){
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
          } = this.props.form;
      
          // Only show error after a field is touched.
          const userError = isFieldTouched('user') && getFieldError('user');
          const passwordError = isFieldTouched('password') && getFieldError('password');
       
        return(
            <Form layout='inline' onSubmit={this.handleSubmit}>
                <Form.Item
                    validateStatus={userError ? 'error' : ''}
                    help={userError || ''}
                >
                {getFieldDecorator('user', {
                    rules: [{ required: true, message: '请输入用户名或邮箱' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                )}
                </Form.Item>
                <Form.Item
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={this.hasErrors(getFieldsError())}
                    >
                        登录
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to='/register'>
                        <Button
                            type="primary"
                        >
                            注册
                        </Button>
                    </Link>
                </Form.Item>
      </Form>
        )
    }
}

LogInBox.propTypes = {
    setInfo:PropTypes.func
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setInfo:(info)=>{
            dispatch(createlogInAction(info));
        }
    }
}

export default connect(null,mapDispatchToProps)(Form.create({ name: 'loginForm' })(LogInBox));