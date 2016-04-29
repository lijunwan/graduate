import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import __ from "lodash";
import antd from 'antd';
import encHex from 'crypto-js/enc-hex';
import MD5 from 'crypto-js/md5';
import '../../../css/login.css'
import logoImg from '../../../images/logo.jpg';
import adImg from '../../../images/ad.jpg';
var Icon = antd.Icon;
var message = antd.message;
var url;
var captchaInput;
export default class Login extends Component {
	 constructor(props) {
	    super(props);
	    this.state={
	    	formValue:{
	    		phone:"",
	    		password:"",
	    	},
				message:[],
				isPass:{
					phone:false,
					password:false,
				},
				isSubmit:false,
	    }
    }
  	componentWillReceiveProps(nextProps){
  		if(nextProps && nextProps.client){
    		if(nextProps && nextProps.client.toJS().info.id != undefined){
					this.props.history.pushState('null','/index');
    		}
			else if(__.has(nextProps.client.toJS().info,"errorCode")){
				if(nextProps.client.toJS().info.errorCode!="401400")
  			var message=["","用户名或密码错误"]
				this.setState({
					message:__.assign({},this.state.message,message),
					isSubmit:false,
				})
			}
		}
    	}
    	loginIn(e){
				e.preventDefault();
				if(!this.state.isPass.password && !this.state.isPass.phone){
					var message=["","用户名和密码不能为空"]
					this.setState({
						message:__.assign({},this.state.message,message)
					})
				}else if(!this.state.formValue.phone){
					var message=["用户名不能为空",""]
					this.setState({
						message:__assign({},this.state.message,message)
					})
				}else if(!this.state.formValue.password){
					var message=["","密码不能为空"]
					this.setState({
						message:__.assign({},this.state.message,message)
					})
				}else{
					var message=["",""];
					this.setState({
						message:__.assign({},this.state.message,message)
					})
					var params = __.assign({},this.state.formValue)
					//params.password = encHex.stringify(MD5(this.state.formValue.password));
					console.log(params,"password")
					this.props.clientBoundAC.checkLogin(params);
					this.setState({
						isSubmit:true,
					})
				}

    	}
    	onChange(e) {
	    	let json = {};
				let value = e.target.value.replace(/^\s+|\s+$/g, "");
				let isPass = {};
	    	json[e.target.id] = value;
				if(value==""){
					isPass[e.target.id]=false;
				}else{
					isPass[e.target.id]=true;
				}
				this.setState({
					formValue: __.assign({},this.state.formValue, json),
					isPass: __.assign({},this.state.isPass, isPass)
				});
  		}
	 enterToLogin(e) {
	    if(e.keyCode == 13){
	      //this.login();
	    }
	  }
    	render() {
    		return (
    			<div>
						<div className="Login-header">
							<img src={logoImg}/>
							<ul>
								<li className="Login-icon1"><a href="javascript:void(0)" >货到付款</a></li>
								<li className="Login-icon2"><a href="javascript:void(0)">正品保障</a></li>
								<li className="Login-icon3"><a href="javascript:void(0)">上门退款</a></li>
							</ul>
						</div>
						<div className="Login-box">
								<div className="Login-box-ad">
									<img src={adImg} />
								</div>
			    			<form className="Login-box-form">
			    				<p className="Login-box-title">账户登录</p>
									<div className="Login-box-input">
									<i className="fa fa-user"></i>
			    				<input id="phone"
			    						type="text"
								    	placeholder="手机号"
											value = {this.state.formValue.auth}
											onChange={this.onChange.bind(this)}/><br/>
									</div>
									<p className="Login-box-mess">{this.state.message[0]}</p>
									<div className="Login-box-input">
										<i className="fa fa-lock"></i>
				    				<input id="password"
				    						type="password"
				    						placeholder="密码"
				    						value={this.state.formValue.password}
				    						onChange={this.onChange.bind(this)}/><br/>
									</div>
									<p className="Login-box-mess">{this.state.message[1]}</p>
									<div className="Login-box-submitWrap">
				    				<input className="Login-box-submit"
				    							 type="submit" value="登录"
				    							 onClick={this.loginIn.bind(this)}
				    							 disabled={this.state.isSubmit?"disabled":""}></input>
										{this.state.isSubmit?<i className="fa fa-spinner fa-spin"></i>:""}
									</div>
									<br/>
			    				<p className="Login-box-linkregister"><Link to="/register">立即注册</Link></p>
									<div className="Login-box-partner">
										<p>合作伙伴</p>
										<i className="Login-box-icon qq"></i>
										<i className="Login-box-icon weixin"></i>
										<i className="Login-box-icon weibo"></i>
										<i className="Login-box-icon pay"></i>
									</div>
			    			</form>
	    			</div>
    			</div>
    		)
    	}
  }
