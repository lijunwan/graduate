import React, { Component } from 'react';
import {Row,Col} from 'antd';
import SearchBar from '../common/SearchBar';
import '../../../css/user.css';
import BaseInfo from './BaseInfo';
import Account from './Account';
import Address from './Address';
export default class  User extends Component {
	constructor(props) {
		super(props);
		let initPageFlag = 'baseInfo'
		if(localStorage.getItem("userMenu")){
			initPageFlag = localStorage.getItem("userMenu");
			localStorage.removeItem('userMenu');
		}
		this.state = {
			pageFlag: initPageFlag,
		}
	}
	showContent(value) {
		this.setState({
			pageFlag: value,
		})
	}
	componentDidMount() {
		this.props.clientBoundAC.getUserInfo();
	}
	createContent() {
		switch (this.state.pageFlag) {
			case 'baseInfo':
				return(
					<BaseInfo {...this.props} />
				)
			case 'account':
				return(
					<Account {...this.props} />
				)
			case 'address':
				return(
					<Address {...this.props}/>
				)
			default:
				return(
					<BaseInfo {...this.props} />
				)
		}
	}
  render() {
		const userInfo = this.props.client.toJS().userInfo.data;
		if(userInfo) {
			return (
				<div className="User">
					<SearchBar {...this.props} />
					<p>您的位置： 个人中心</p>
					<div className="User-container">
						<Row style={{backgroundColor: '#F5F5F5'}}>
							<Col span="4" style={{width:'139px'}}>
								<div className="User-menu">
									<div className="User-head-wrap">
										<div className="User-head">
											<img src={userInfo.headImg} />
										</div>
									</div>
									<h2>个人中心</h2>
									<ul>
										<li onClick={this.showContent.bind(this, 'baseInfo')}>基本资料</li>
										<li onClick={this.showContent.bind(this, 'account')}>账户设置</li>
										<li onClick={this.showContent.bind(this, 'address')}>收货地址</li>
									</ul>
								</div>
							</Col>
							<Col span="20" style={{width:'1059px'}}>
								<div className="User-content">
									{this.createContent()}
								</div>
							</Col>
						</Row>
				</div>
				</div>
			)
		}
		return(
			<div>...</div>
		)
  }
}
