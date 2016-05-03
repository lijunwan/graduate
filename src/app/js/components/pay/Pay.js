import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import SimpleStep from '../common/SimpleStep';
import {Row, Col} from 'antd'
export default class Pay extends Component {
	componentWillReciveProps(nextProps) {
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
							<SimpleStep stepIndex={parseInt("2")} />
					</Col>
				</Row>
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
			</div>
		)
	}
}
