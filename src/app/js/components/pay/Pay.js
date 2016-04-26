import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import SimpleStep from '../common/SimpleStep';
import {Row, Col} from 'antd'
export default class Pay extends Component {
	componentWillReciveProps(nextProps) {
	}
	payOrder() {
		const orderInfoData = this.props.order.toJS().orderInfo.data;
		if(orderInfoData) {
			this.props.orderBoundAC.payOrder({orderId: orderInfoData['_id']});
		}
	}
	createBookItem(data) {
		const list = [];
		data.info.map((item,index)=>{
			list.push(
				<span style={{letterSpacing: '0.5', marginRight: '20px'}}>{item.bookName}</span>
			)
		})
		return list;
	}
	render() {
		const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));
		return(
			<div>
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
						<Col span="20"><p style={{letterSpacing: '0.5em'}}>订单号:<span style={{letterSpacing: '0.1'}}>{orderInfo['_id']}</span></p></Col>
						<Col span="4"><span className="Pays-money">{(orderInfo.sumMon).toFixed(2)}</span>元</Col>
					</Row>
					<Row>
						<Col span="2"><p>商品信息：</p></Col>
						<Col span="20">{this.createBookItem(orderInfo)}</Col>
					</Row>
					<a onClick={this.payOrder.bind(this)} className="Pay-button">支付</a>
				</div>
			</div>
		)
	}
}
