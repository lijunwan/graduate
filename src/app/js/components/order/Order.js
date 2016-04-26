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
		const payStatus = {
			'UNPAI': '未支付',
			'UNSEND': '买家已支付等待卖家发货'
		}
		const list = [];
		if(data) {
			data.map((item)=>{
				const info = [];
				item.info.map((infoItem, index)=>{
					info.push(
						<div key={index} className="Order-item-content">
							<Row>
								<Col span="4"><img src={infoItem.cover} style={{width: '80px'}}/></Col>
								<Col span="4"><div>{item.sumMon}</div></Col>
								<Col span="4">{item.time}</Col>
								<Col span="4">{payStatus[item.orderStatus]}</Col>
							</Row>
							<hr></hr>
						</div>
					)
				})
				list.push(
					<div className="Order-item">
						<Row>
							<div className="Order-item-head">	订单号:{item['_id']}</div>
						</Row>
						<Row>
							{info}
						</Row>
					</div>
				)
			})
		}
		return list;
	}
	render() {
		return(
			<div className="OrderTable">
				<Row style={{height: '34px', lineHeight: '34px', textAlign: 'center'}}>
						<Col span="4">商品信息</Col>
						<Col span="4">实付款</Col>
						<Col span="4">创建时间</Col>
						<Col span="4">状态</Col>
						<Col span="4">操作</Col>
				</Row>
				<div>{this.createItem()}</div>
			</div>
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