import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
export default class Pay extends Component {
	componentWillReciveProps(nextProps) {
	}
	payOrder() {
		const orderInfoData = this.props.order.toJS().orderInfo.data;
		console.log(orderInfoData['_id'], '????');
		if(orderInfoData) {
			this.props.orderBoundAC.payOrder({orderId: orderInfoData['_id']});
		}
	}
	render() {
		return(
			<div>
				<a onClick={this.payOrder.bind(this)}>支付</a>
			</div>
		)
	}
}