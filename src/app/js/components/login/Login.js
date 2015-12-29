import React, { Component, PropTypes } from 'react';
import __assign from "lodash/object/assign";
import __has from 'lodash/object/has';
import antd from 'antd';
import encHex from 'crypto-js/enc-hex';
import MD5 from 'crypto-js/md5';
var Icon = antd.Icon;
var message = antd.message;
var url;
var captchaInput;
export default class Login extends Component {
	 constructor(props) {
	    super(props);
	    this.state={
	    	formValue:{
	    		auth:"",
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
    		e.preventDefault();
    		var params = this.state.formValue;
    		if(params.auth != "" && params.password != "" && params.captcha !=""){
		      //params.password = encHex.stringify(MD5(params.password));
		            //this.props.clientBoundAC.checkLogin(params);
		}else if(params.auth == "" || params.password == ""){
		    	message.error("Missing user name or password")
		}
    	}
    	onChange(e) {
	    	let json = {};
	    	json[e.target.id] = e.target.value.replace(/^\s+|\s+$/g, "");
		this.setState({formValue: __assign(this.state.formValue, json)});
  	}
  	// freshenCaptcha() {
  	// 	var d = new Date();
   //        	var captchaUrl = "/api/site/captcha?t=" + d.getTime();
   //  		this.setState({captchaImg:captchaUrl});
   //  		this.clearCaptchaInput();
  	// }
	 enterToLogin(e) {
	    if(e.keyCode == 13){
	      this.login();
	    }
	  }
	// clearCaptchaInput() {
	// 	let json = {};
	//     	json["captcha"] = "";
	//     	this.setState({formValue: __assign(this.state.formValue, json)});
	// }
    	render() {
    		//var d = new Date();
    		//var captchaUrl = "/api/site/captcha?t=" + d.getTime();
    		//var captchaUrl = "/api/site/captcha";
    		//console.log(this.props.client.toJS().captcha);
    		return (
    			<div>
	    			<form className="ModalForm">
	    				<p className="ModalForm-cross">
		    				<a herf="#" >
		    					<Icon type="cross-circle-o" />
		    				</a>
	    				</p>
	    				<p className="ModalForm-title">Login</p>
	    				<input id="auth" 
	    						type="text" 
						    	placeholder="Email" 
							value = {this.state.formValue.auth}
							onChange={this.onChange.bind(this)}/><br/>
	    				<input id="password" 
	    						type="password" 
	    						placeholder="Password" 
	    						value={this.state.formValue.password}
	    						onChange={this.onChange.bind(this)}/><br/>
	    				<input className="ModalForm-submit" type="submit" value="Login" onClick={this.loginIn.bind(this)}/><br/>
	    				<p className="ModalForm-linkregister">No account,<a >register now</a></p>
	    			</form>
	    			<div className="ModalForm-box"></div>
    			</div>
    		)
    	}
  }
