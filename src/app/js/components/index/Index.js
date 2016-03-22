import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
export default class  Index extends Component{
	render(){
		return(
			<div className="Index">
				<div className="Index-header">
					<img src={logoImg} alt=""/>
					<input placeholder="请输入图书名或者作者名字进行搜索"/>
					<a href="javascript:;"><i className="fa fa-search"></i></a>
				</div>
			</div>
	  )
	}
}
