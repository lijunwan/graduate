import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import '../../../css/common/header.css';
export default class Header extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		"isShowMenu":false
    	}
  	}
  	showMenu(){
  		this.setState({
  			"isShowMenu":true,
  		})
  	}
  	hideMenu(){
  		this.setState({
  			"isShowMenu":false,
  		})
  	}
	render() {
		//console.log(this.props.client.toJS(),"Header")
		let info = this.props.client.toJS().info;
		let userClass = this.state.isShowMenu ? "Header-user Header-user-show" :"Header-user Header-user-hide";
		return(
			<div className="Header">
				<div className="Header-wrap">
					<div className="Header-left">
						{ info && info.id != undefined
						?<div>
							<ul className="Header-user-wrap" onMouseEnter={this.showMenu.bind(this)} onMouseLeave={this.hideMenu.bind(this)}>
								{info.account}
								<i className="fa fa-angle-down"></i>
								<ul className={userClass}>
									<div className="Header-triangle"></div>
									<li><a>账号管理</a></li>
									<li><a>退&nbsp;&nbsp;出</a></li>
								</ul>
							</ul>
						 </div>
						:<p>欢迎光临智源，请
							<span className="Header-link"><Link to='/login'>登录</Link></span>
							&nbsp;<Link to='/register'>免费注册</Link>
						</p>
						}
					</div>
					<ul className="Header-menu">
						<li><a herf="javascript:;">我的订单</a></li>
						<li><a herf="javascript:;">购物车</a></li>
						<li><a herf="javascript:;">收藏夹</a></li>
					</ul>
				</div>
			</div>
		)
	}
}
