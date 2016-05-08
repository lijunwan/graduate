import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import __ from "lodash";
import '../../../css/common/register.css';
import logoImg from '../../../images/logo.jpg';
import antd from 'antd';
import { message, notification } from 'antd';
export default class Register extends Component {
	constructor(props) {
	    super(props);
			this.state={
				formValue:{
					phone:"",
					userName:"",
					password:"",
					twicePass:"",
				},
				message:{
					phoneMess:"",
					userNameMess:"",
					passwordMess:"",
					twicePassMess:"",
				},
		    flag:{
					phone_flag:-1,//-1表空 0表通过 -2表格式不正确
					userName_flag:-1,
					password_flag:-1,
					twicePass_flag:-1,
				}
			}
    }
		inputBlur(e) {
			let value = e.target.value;
			let id = e.target.id;
			let result = this.validateValue(value, id);
			if(id=="phone" && result.flag==0){
				this.props.clientBoundAC.checkPhone({phone:value});
			}
			let message = __.assign({},this.state.message);
			message[id+"Mess"] = result.message;
			let flag = __.assign({},this.state.flag);
			flag[id+"_flag"] = result.flag;
			this.setState({
				message:message,
				flag:flag,
			})
		}
		inputChange(e) {
			let value = e.target.value.replace(/^\s+|\s+$/g, "");
			let id = e.target.id;
			console.log("id",id,e.target.value);
			var obj = __.assign({},this.state.formValue);
			obj[id] = value;
			this.setState({
				formValue:obj,
			});
			console.log(this.state[id+"Mess"],"mess")
			if(this.state.message[id+"Mess"]!=""){
				let result = this.validateValue(value, id);
				let message = __.assign({},this.state.message);
				message[id+"Mess"] = result.message;
				let flag = __.assign({},this.state.flag);
				flag[id+"_flag"] = result.flag;
				this.setState({
					message:message,
					flag:flag,
				})
			}
		}
		validateValue(value,id) {
			var result = {message:"",flag:"-1"};
			switch (id) {
				case "phone":result = this.validatePhone(value);
					break;
				case "userName":result = this.validateUserName(value);
					break;
				case "password":result = this.validatePassword(value);
					break;
				case "twicePass":result = this.validateTwicePassword(value);
					break;
				default:;
			}
			return result;
		}
		validatePhone(value){
			var reg = /^[1][358][0-9]{9}$/;
			if(value==""){
				return{
					flag:-1,
					message:"手机号码不能为空"
				}
			}else if(reg.test(value)){
				return{
					flag:0,
					message:""
				}
			}else{
				return{
					flag:-2,
					message:"请输入合法的手机号码"
				}
			}
			return{
				flag:0,
				message:""
			}
		}
		validateUserName(value){
			if(value==""){
				return{
					flag:-1,
					message:"请输入用户名"
				}
			}else if(value.length>1 && value.length<21){
				return{
					flag:0,
					message:""
				}
			}else{
				return{
					flag:-2,
					message:"用户名由2-20个字符组成"
				}
			}
			return{
				flag:0,
				message:""
			}
		}
		validatePassword(value){
			if(value==""){
				return{
					flag:-1,
					message:"密码不能为空"
				}
			}else if(value.length>5 && value.length<21){
				return{
					flag:0,
					message:""
				}
			}else{
				return{
					flag:-2,
					message:"密码由6-20个字符组成"
				}
			}
			if(this.state.twicePass!=""){
				this.validateTwicePassword(this.state.twicePass)
			}
			return{
				flag:0,
				message:""
			}
		}
		validateTwicePassword(value){
			console.log("passTwic",this.state.formValue.password,value)
			if(value==""){
				return{
					flag:-1,
					message:"请再次输入密码"
				}
			}else if(value != this.state.formValue.password){
				return{
					flag:-2,
					message:"两次密码不一致"
				}
			}else{
				return{
					flag:0,
					message:""
				}
			}
			return{
				flag:0,
				message:""
			}
		}
		submitRegister(e){
			e.preventDefault();
			var keys = __.keys(this.state.flag);
			var flag = 0;
			keys.map((key)=>{
				if(this.state.flag[key]==-1){
					flag = -1;
					console.log(key,"key//////////")
				}else if(this.state.flag[key]==-2){
					flag = -2;
				}
			})
			if(flag==-2){
				e.preventDefault();
				message.warn('填写的信息有误，请更正');
			}else if(flag==-1){
				e.preventDefault();

				message.warn('请填写完整的信息!!');
			}else if(flag==0){
				this.props.clientBoundAC.createUser(this.state.formValue)
			}
			return false;
		}
		componentWillReceiveProps(nextProps){
			var registerInfo = nextProps.client.toJS().registerInfo;
			console.log('???',registerInfo)
			if(__.has(registerInfo,"errorCode")){
				message.error('表单信息验证未通过!');
			}else if(registerInfo.status && registerInfo.status=="ok"){
				console.log('???')
				message.success('注册成功');
				this.props.history.pushState(null,'/login')
			}
		}
		componentWillUnmount() {
			this.props.clientBoundAC.resetPhone();
		}
    render(){
			let phoneInfo = this.props.client.toJS().phoneInfo;
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
							<input placeholder="手机号"
										 id="phone"
										 value={this.state.formValue.phone}
										 onChange={this.inputChange.bind(this)}
										 onBlur={this.inputBlur.bind(this)}></input>
									 {phoneInfo.status
										? phoneInfo.status =="wating"
												? <span className="Register-phone"><i className="fa fa-spinner fa-spin"></i><span>正在检测</span></span>
												:<span className="Register-phone"><i className="fa fa-check"></i>手机号可以使用</span>
											: phoneInfo.errorCode ?<span className="Register-phone"><i className="fa fa-times Register-error"></i>手机号已被占用</span>:"" }
							<p id="phoneMess">{this.state.message.phoneMess}</p>
						</div>

					  <div className="Register-input">
							<i className="fa fa-user"></i>
							<input placeholder="用户名"
										 id="userName"
										value={this.state.formValue.userName}
										onChange={this.inputChange.bind(this)}
										onBlur={this.inputBlur.bind(this)}></input>
							<p id="userNameMess">{this.state.message.userNameMess}</p>
						</div>
					  <div className="Register-input">
							<i className="fa fa-lock"></i>
							<input placeholder="密码"
										 id="password"
										 value={this.state.formValue.password}
										 type="password"
										 onChange={this.inputChange.bind(this)}
										 onBlur={this.inputBlur.bind(this)}></input>
									 <p id="passwordMess">{this.state.message.passwordMess}</p>
						</div>
						<div className="Register-input">
							<i className="fa fa-key"></i>
							<input placeholder="确认密码"
										 value={this.state.formValue.twicePass}
										 id="twicePass"
										 type="password"
										 onChange={this.inputChange.bind(this)}
										 onBlur={this.inputBlur.bind(this)}></input>
						<p id="twicePassMess">{this.state.message.twicePassMess}</p>
						</div>
						<div className="Register-input">
							<input type="submit" value="注册" className="Register-submit" onClick={this.submitRegister.bind(this)}></input>
						</div>
					</form>
					</div>
				</div>
			)
    }
}
