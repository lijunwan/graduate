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
	render() {
		const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));
		return(
			<div>
				<Row style={{margin: '50px 0'}}>
					<Col span="8">
							<img src={logoImg} href="/"/>
					</Col>
					<Col span="16" style={{marginTop: '15px'}}>
							<SimpleStep stepIndex={parseInt("2")} />
					</Col>
				</Row>
				<p>{orderInfo.sumMon}</p>
				<a onClick={this.payOrder.bind(this)}>支付</a>
			</div>
		)
	}
}
