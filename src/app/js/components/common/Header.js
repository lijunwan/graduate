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
	logOut(){
		this.props.clientBoundAC.logOut();
	  //this.props.history.pushState(null,'/')
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
								<div className="Header-user-headImg">
									<img src={info.data.headImg} alt={info.userName} />
								</div>
								{/*<i className="fa fa-angle-down"></i>*/}
								<ul className={userClass}>
									<div className="Header-triangle"></div>
									<li><Link to="/user">个人中心</Link></li>
									<li><a href="javascript:;" onClick={this.logOut.bind(this)}>退&nbsp;&nbsp;出</a></li>
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
						<li><Link to='/order'>我的订单</Link></li>
						<li><Link to='/shopCart'>购物车</Link></li>
						<li><Link to='/favorite'>收藏夹</Link></li>
					</ul>
				</div>
			</div>
		)
	}
}
