import React, { Component, PropTypes } from 'react';
import {Row,Col, Checkbox, Spin} from 'antd';
import '../../../css/ShopCart.css'
import ShopCartItem from './ShopCartItem';
import __concat from 'lodash/concat';
import logoImg from '../../../images/logo.jpg';
import __keys from 'lodash/keys';
export default class  ShopCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			sumMon: 0,
			isChoiceAll: false,
			checkboxChild:[],
		}
	}
	componentDidMount() {
		this.props.clientBoundAC.getShopCartInfo();
	}
	componentWillReceiveProps(nextProps){
		const data  = nextProps.client.toJS().shopCart.data;
		const list = [];
		if(data) {
		if(this.state.checkboxChild.length<1) {
			data.map((item, index)=>{
					list[index] = false;
			});
			this.setState({
				checkboxChild: list,
			})
			}
		}
		const checkboxChild = this.state.checkboxChild;
		let sumMon = 0;
		let count = 0;
		checkboxChild.map((flag,i)=>{
			if(flag) {
				sumMon += Math.round(data[i].bookInfo.aprice * data[i].shopCartInfo.count * 100)/100;
				count += data[i].shopCartInfo.count;
			}
		})
		this.setState({
			sumMon: sumMon.toFixed(2),
			count: count,
		})
	}
	setIsChecked(index) {
		let flagAarr = __concat([], this.state.checkboxChild);
		const data = this.props.client.toJS().shopCart.data;
		let sumMon = 0;
		let count = 0;
		flagAarr[index] = !this.state.checkboxChild[index];
		let flag = true;
		for(let i=0; i < flagAarr.length; i++) {
			if(flagAarr[i] === false) {
				flag = false;
			}else {
				sumMon += Math.round(data[i].bookInfo.aprice * data[i].shopCartInfo.count * 100)/100;
				count += data[i].shopCartInfo.count;
			}
		}
		this.setState({
			checkboxChild: flagAarr,
			isChoiceAll: flag,
			sumMon: sumMon.toFixed(2),
			count: count,
		});
	}
	createShopCartItem() {
		const data  = this.props.client.toJS().shopCart.data;
		const list = [];
		if(data){
			data.map((item, index)=>{
				list.push(
					<ShopCartItem {...this.props}
					data={item}
					key= {index}
					isChoiceAll={this.state.isChoiceAll}
					index={index}
					checkboxChild={this.state.checkboxChild}
					setIsChecked={this.setIsChecked.bind(this)}/>
				)
			});
		}
		return list;
	}
	choiceAll() {
		let flagAarr = __concat([], this.state.checkboxChild);
		const data = this.props.client.toJS().shopCart.data;
		let count = 0;
		let sumMon = 0;
		for(let i=0; i < flagAarr.length; i++) {
			if(__keys(data[i].bookInfo).length > 0){//是否失效
				flagAarr[i] = !this.state.isChoiceAll;
				if(!this.state.isChoiceAll) {
					sumMon += Math.round(data[i].bookInfo.aprice * data[i].shopCartInfo.count * 100)/100;
					count += data[i].shopCartInfo.count;
				}
			}
		}
		this.setState({
			checkboxChild: flagAarr,
			isChoiceAll: !this.state.isChoiceAll,
			sumMon: sumMon.toFixed(2),
			count: count,
		});
	}
	confirmPay() {
		const list = [];
		const data = this.props.client.toJS().shopCart.data;
		const orderData = {}
		this.state.checkboxChild.map((flag, index)=>{
			if(flag) {
				list.push(data[index]);
			}
		});
		orderData.bookInfo = list;
		orderData.sumMon = this.state.sumMon;
	   localStorage.setItem('confirmOrder', JSON.stringify(orderData))
       this.props.history.push({pathname: '/payment/'})
	}
	render() {
		if(this.props.client.toJS().shopCart.data) {
			return (
				<div>
					<Row style={{width:'1200px',margin: '40px auto 30px'}}>
						<Col span="4"><a href="/"><img src={logoImg} alt=""/></a></Col>
						<Col span="20" style={{height: '60px',lineHeight: '60px'}}>
							<div className="ShopCart-procedure">
								<span className="current">我的购物车</span>
								<span>填写订单</span>
								<span>完成订单</span>
							</div>
						</Col>
					</Row>
					<hr className="ShopCart-hr"></hr>
					<div style={{width:'1200px',margin: 'auto'}}>
					<Row >
						<Col span="4"><Checkbox onChange={this.choiceAll.bind(this)} checked={this.state.isChoiceAll}/>全选</Col>
						<Col span="4">商品信息</Col>
						<Col span="4">单价（元）</Col>
						<Col span="4">数量</Col>
						<Col span="4">金额（元）</Col>
						<Col span="4">操作</Col>
					</Row>
					<div style={{border: '1px solid #e4e4e4',padding: '40px 14px 0',marginTop: '20px',background: '#fafafa'}}>
						{this.createShopCartItem()}
					</div>
					<Row style={{height: '63px', border: '1px solid #dcdcdc', borderWidth: '0 1px 1px',background: '#fafafa'}}>
						<Col span="4" style={{height: '63px', lineHeight: '63px', textAlign: 'center',color:'#323232',fontWeight: 'bold'}}>合计</Col>
						<Col span="8"  style={{height: '63px', lineHeight: '63px', textAlign: 'left'}}>已选择<span style={{color: '#ff2832'}}>{this.state.count}</span>件商品</Col>
						<Col span="6"  style={{height: '63px', lineHeight: '63px', textAlign: 'right'}}>总计<span style={{fontSize: '18px', color: '#ff2832'}}>￥{this.state.sumMon}</span></Col>
						<Col span="4"  style={{height: '63px', lineHeight: '63px', textAlign: 'right'}}>
							{
								this.state.count < 1 ?
								<a className="ShopCart-button ShopCart-button-disable">结算</a>
								:
								<a className="ShopCart-button" onClick={this.confirmPay.bind(this)}>结算</a>
							}
						</Col>
					</Row>
					</div>
				</div>
			);
		}
		return(
			<Spin />
		)
	}
}
