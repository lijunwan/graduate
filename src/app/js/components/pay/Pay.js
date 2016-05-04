import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import SimpleStep from '../common/SimpleStep';
import {Row, Col} from 'antd'
export default class Pay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPaySuccess: 0,//0 支付状态 1 支付成功状态 -1支付失败状态
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log('???')
		const data = nextProps.order.toJS().payOrder.data;
		if(data) {
			this.setState({
				isPaySuccess: 1,
			})
		}else{
			this.setState({
				isPaySuccess: -1,
			})
		}
	}
	payOrder(data, sumMon) {
		if(data.length > 0) {
			this.props.orderBoundAC.payOrder({orderInfo: JSON.stringify(data), sumMon: sumMon});
		}
	}
	createContent(data) {
		const list = [];
		data.map((item, index)=>{
			list.push(
				<Row key={index}>
					<Col span="6">{item['_id']}</Col>
					<Col span="8">{item.bookName}</Col>
					<Col span="4">{item.time.split('T')[0]}</Col>
				</Row>
			);
		});
		return list;
	}
	countMoney(data) {
		let sumMon = 0;
		data.map((item, index)=>{
			sumMon += item.sumMon
		});
		return sumMon.toFixed(2);
	}
	render() {
		const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));
		const sumMon = this.countMoney(orderInfo);
		return(
			<div className="Pay">
				<Row style={{margin: '50px 0'}}>
					<Col span="8">
						<a href="/"><img src={logoImg}/></a>
					</Col>
					<Col span="16" style={{marginTop: '15px'}}>
							<SimpleStep stepIndex={parseInt("1")} />
					</Col>
				</Row>
				{
					this.state.isPaySuccess === 1 ?
					<div className="Pay-content">
						<div className="Pay-mess">
							<i className="fa fa-check-circle" aria-hidden="true"></i>
							<p>恭喜您,支付成功</p>
						</div>
					</div>
					: this.state.isPaySuccess === -1 ?
					<div className="Pay-content">
						<div className="Pay-mess">
							<i className="fa fa-frown-o" aria-hidden="true"></i>
							<p>支付失败,请稍后再试</p>
						</div>
					</div>
					:
					<div className="Pay-content">
						<Row>
							<Col span="6">订单号</Col>
							<Col span="8">商品信息</Col>
							<Col span="4">订单创建时间</Col>
						</Row>
						{this.createContent(orderInfo)}
						<p style={{marginTop: '10px'}}><span className="Pays-money">{sumMon}</span>元</p>
						<a onClick={this.payOrder.bind(this, orderInfo , sumMon)} className="Pay-button">支付</a>
					</div>
				}
			</div>
		)
	}
}
