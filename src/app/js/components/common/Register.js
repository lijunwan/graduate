import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import '../../../css/common/register.css';
import logoImg from '../../../images/logo.jpg'
export default class Register extends Component {
	constructor(props) {
	    super(props);
    }
    render(){
    	return(
				<div className="Register">
					<div className="Register-header">
						<img src={logoImg} alt=""/>
						<div className="Register-header-right">
						<span className="Register-header-link">
							<Link to="/index"><i className="fa fa-home"></i>汇源首页</Link>
						</span>
						<span className="Register-header-link">
							<Link to="/login">登录</Link>
						</span>
						</div>
					</div>
					<div className="Register-form">
					<h3>用户注册</h3>
					<form>
						<div className="Register-input">
							<i className="fa fa-phone"></i>
							<input placeholder="手机号"></input>
						</div>
					  <div className="Register-input">
							<i className="fa fa-user"></i>
							<input placeholder="用户名"></input>
						</div>
					  <div className="Register-input">
							<i className="fa fa-lock"></i>
							<input placeholder="密码"></input>
						</div>
						<div className="Register-input">
							<i className="fa fa-key"></i>
							<input placeholder="确认密码"></input>
						</div>
						<div className="Register-input">
							<input type="submit" value="注册" className="Register-submit"></input>
						</div>
					</form>
					</div>
				</div>
			)
    }
}
