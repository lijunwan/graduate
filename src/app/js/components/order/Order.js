import React, { Component, PropTypes } from 'react';
import SearchBar from '../common/SearchBar';
export default class Order extends Component {
	componentWillMount() {
		this.props.orderBoundAC.getOrder();
	}
	render() {
		console.log(this.props, '----')
		return (
			<div>
				<SearchBar {...this.props} />
				<h2>我的订单</h2>
				<OrderTable {...this.props}/>
			</div>
		)
	}
}
class OrderTable extends Component {
	render() {
		return(
			<table>
				<thead>
					<tr>
						<th>商品信息</th>
						<th>实付款</th>
						<th>创建时间</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		)
	}
}