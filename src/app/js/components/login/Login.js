import React, { Component, PropTypes } from 'react';
//import __assign from "lodash/isobject/assign";
// import __has from 'lodash/object/has';
import antd from 'antd';
import encHex from 'crypto-js/enc-hex';
import MD5 from 'crypto-js/md5';
import '../../../scss/login.css'
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
	    		account:"",
	    		password:"",
	    	},
	    }
    	}
    	componentWillMount(){
    		//this.freshenCaptcha();
    	}
    	componentDidMount() {
    		//captchaInput = document.getElementById("captchaInput")
    	}
    	componentWillReceiveProps(nextProps){
  //   		if(nextProps && nextProps.client){
	 //    		if(nextProps && nextProps.client.toJS().info.id != undefined){
	 //    			message.success("Success");
	 //    			this.props.closeLogin();
	 //      			//this.props.loginInSuccess();
	 //      			//this.props.closeLogin();
	 //    		}
		// 	else if(nextProps.client.toJS().info.errorCode == 403999){
		// 		message.error("Invalid security code ");
		// 		this.freshenCaptcha();
		// 	}else if(__has(nextProps.client.toJS().info,"errorCode")){
	 //    			message.error("Invalid username or password");
	 //    			this.freshenCaptcha();
		// 	}
		// }
    	}
    	loginIn(e){
    	  console.log(this.props,"123");
    	  var params ={"account":"15123578379","password":"123456"}
			  this.props.clientBoundAC.checkLogin(params);
			  e.preventDefault();
			  return false;

    	}
    	onChange(e) {
	    	let json = {};
	    	json[e.target.id] = e.target.value.replace(/^\s+|\s+$/g, "");
				this.setState({formValue: __assign(this.state.formValue, json)});
  		}
	 enterToLogin(e) {
	    if(e.keyCode == 13){
	      //this.login();
	    }
	  }
    	render() {
    		console.log(this.props,"1213")
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
			    				<input id="auth"
			    						type="text"
								    	placeholder="手机号"
											value = {this.state.formValue.auth}
											onChange={this.onChange.bind(this)}/><br/>
			    				<input id="password"
			    						type="password"
			    						placeholder="密码"
			    						value={this.state.formValue.password}
			    						onChange={this.onChange.bind(this)}/><br/>
			    				<input className="ModalForm-submit" type="submit" value="Login" onClick={this.loginIn.bind(this)}/><br/>
			    				<p className="ModalForm-linkregister">立即注册</p>
			    			</form>
	    			</div>
    			</div>
    		)
    	}
  }
