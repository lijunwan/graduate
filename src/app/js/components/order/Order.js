import React, { Component, PropTypes } from 'react';
import SearchBar from '../common/SearchBar';
import '../../../css/order.css';
import logoImg from '../../../images/logo.jpg';
import {Select, Row, Col} from 'antd';
const Option = Select.Option;
export default class Order extends Component {
	componentWillMount() {
		this.props.orderBoundAC.getOrder();
	}
	render() {
		console.log(this.props, '----')
		return (
			<div className="Order">

				<SearchBar {...this.props} />
				<h2><i className="fa fa-file-text-o"></i>我的订单</h2>
				<Row style={{margin: '10px 0 20px'}}>
					<Col span="4" style={{marginTop: '3.5px'}}>
						<Select defaultValue="all" style={{ width: 120 }}>
						<Option value="all">全部状态</Option>
						<Option value="unpay">未支付</Option>
						<Option value="unsend">待发货</Option>
						<Option value="uncomfirm">未确认收货</Option>
						<Option value="unjudge">未评价</Option>
						</Select>
					</Col>
					<Col span="6"><OrderSearch /></Col>
				</Row>
				<OrderTable {...this.props}/>
			</div>
		)
	}
}
class OrderTable extends Component {
	createItem() {
		const data = this.props.order.toJS().orderList.data;
		const list = [];
		if(data) {
			data.map((item)=>{
				const info = [];
				item.info.map((infoItem, index)=>{
					info.push(
						<img key={index} src={infoItem.cover} style={{width: '80px'}}/>
					)
				})
				list.push(
					<tr>
						<td>{info}</td>
						<td>{item.sumMon}</td>
						<td>{item.time}</td>
					</tr>
				)
			})
		}
		return list;
	}
	render() {
		return(
			<table className="OrderTable">
				<thead>
					<tr>
						<th>商品信息</th>
						<th>实付款</th>
						<th>创建时间</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>{this.createItem()}</tbody>
			</table>
		)
	}
}
class OrderSearch extends Component {
	render() {
		return(
			<div className="OrderSearch">
			    <input placeholder="请输入商品名称或者订单号进行查询"/>
			    <a href="javascript:;"><i className="fa fa-search"></i></a>
			</div>
		)
	}
}
