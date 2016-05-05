import React, { Component, PropTypes } from 'react';
import SearchBar from '../common/SearchBar';
import '../../../css/order.css';
import __slice from 'lodash/slice';
import __keys from 'lodash/keys';
import logoImg from '../../../images/logo.jpg';
import {Select, Row, Col, Pagination} from 'antd';
import moment from 'moment';
const Option = Select.Option;
export default class Order extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderStatus: 'ALL',
			currentData: [],
			pageSize: 5,
			currentPage: 1,
			originalData: [],
			actData:[],
		}
	}
	componentWillReceiveProps(nextProps) {
		const data = nextProps.order.toJS().orderList.data
		this.setState({
			currentData: this.getCurentData(data,1,this.state.pageSize),
			originalData: data ,
			actData: data,
		})
	}
	componentWillMount() {
		this.props.orderBoundAC.getOrder();
	}
	getCurentData(data, current, pageSize) {
			const start = (current-1) * pageSize;
			const end = start + pageSize;
			const dataCuren = __slice(data,start, end);
			console.log('dataCuren', data, start, end)
			return dataCuren;
	}
	changePage(page) {
    console.log('????',page)
     this.setState({
      currentData: this.getCurentData(this.state.actData,page,this.state.pageSize),
      currentPage: page,
     })
  }
	changeStatus(value) {
		this.setState({
			orderStatus: value,
		})
		var list = [];
		if(value != 'ALL'){
			this.state.originalData.map((item)=>{
				console.log(item, value)
				if(item.orderStatus == value) {
					list.push(item)
				}
			})
			this.setState({
				currentPage: 1,
				actData: list,
				currentData: this.getCurentData(list,1, this.state.pageSize)

			})
		} else {
			this.setState({
    		   currentPage: 1,
     		   actData: list,
     		   currentData: this.getCurentData(this.state.originalData,1, this.state.pageSize)
    		})	
		}

	}
	render() {
		console.log('this.state.currentData',this.state.currentData)
		return (
			<div className="Order">

				<SearchBar {...this.props} />
				<h2><i className="fa fa-file-text-o"></i>我的订单</h2>
				<Row style={{margin: '10px 0 20px'}}>
					<Col span="4" style={{marginTop: '3.5px'}}>
						<Select defaultValue="ALL" style={{ width: 120 }} onChange={this.changeStatus.bind(this)}>
						<Option value="ALL">全部状态</Option>
						<Option value="UNPAY">未支付</Option>
						<Option value="UNSEND">待发货</Option>
						<Option value="UNCONFIRM">未确认收货</Option>
						<Option value="UNEVALUATION">未评价</Option>
						</Select>
					</Col>
				</Row>
				<OrderTable {...this.props} statusKey={this.state.orderStatus} currentData={this.state.currentData}/>
				{
					this.state.actData.length <= this.state.pageSize ? '' :
					<Pagination total = {this.state.actData.length} current={this.state.currentPage} pageSize = {this.state.pageSize}  onChange = {this.changePage.bind(this)}/>
				}
			</div>
		)
	}
}
class OrderTable extends Component {
	payOrder(item) {
		console.log(item, '???')
		const orderInfo = [];
		orderInfo.push(item);
		localStorage.setItem('orderInfo', JSON.stringify(orderInfo))
		this.props.history.pushState(null,'/pay');
	}
	showOrder(orderId) {
		this.props.history.pushState(null, '/orderDetail/'+ orderId )
	}
	confirmReceipt(orderId) {
		this.props.orderBoundAC.confirmReceipt({orderId: orderId})
	}
	evaluationBook(item) {
		this.props.history.pushState(null, '/evaluation', {orderId:item['_id'],bookId:item.bookId});
	}
	createOperation(status, item) {
		switch (status) {
			case 'UNPAY':
				return(
				<Col span="4">
				  <p style={{lineHeight: '1.5',marginTop: '30px'}}><a onClick={this.showOrder.bind(this, item['_id'])}>查看订单</a></p>
					<p style={{lineHeight: '1.5'}}><a onClick={this.payOrder.bind(this, item)}>支付</a></p>
				</Col>)
			case 'UNEVALUATION':
				return(
					<Col span="4">
						<p style={{lineHeight: '1.5',marginTop: '30px'}}><a onClick={this.showOrder.bind(this, item['_id'])}>查看订单</a></p>
						<p style={{lineHeight: '1.5'}}><a onClick={this.evaluationBook.bind(this, item)}>评价</a></p>
					</Col>
				)
			default:
				return (
					<Col span="4">
						<p style={{lineHeight: '1.5',marginTop: '30px'}}><a onClick={this.showOrder.bind(this, item['_id'])}>查看订单</a></p>
						<p style={{lineHeight: '1.5'}}><a onClick={this.confirmReceipt.bind(this, item['_id'])}>确认收货</a></p>
					</Col>
				)
		}
	}
	createItem() {
		const data = this.props.currentData;
		const statusKey = this.props.statusKey;
		const payStatus = {
			'UNPAY': '未支付',
			'UNSEND':'买家已支付等待卖家发货',
			'UNEVALUATION': '已收货',
			'EVALUATIONED': '已评价,交易完成',
		}
		const list = [];
		if(data) {
			data.map((item)=>{
				list.push(
					<div className="Order-item">
						<Row>
							<div className="Order-item-head">	订单号:{item['_id']}</div>
						</Row>
						<Row style={{lineHeight: '110px', textAlign: 'center'}}>
							<Col span="4"><img src={item.cover} style={{width: '80px'}}/></Col>
							<Col span="4"><div>{item.sumMon}</div></Col>
							<Col span="4">{moment(item.time).format("YYYY-MM-DD hh:mm:ss")}</Col>
							<Col span="4">{payStatus[item.orderStatus]}</Col>
							{this.createOperation(item.orderStatus, item)}
						</Row>
					</div>
				)
			})
		}
		if(list.length<1) {
			return (<p className="Order-mess">暂无相关订单</p>)
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
