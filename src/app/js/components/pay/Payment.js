import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import logoImg from '../../../images/logo.jpg';
import '../../../css/payment.css';
import __pick from 'lodash/pick';
import SimpleStep from '../common/SimpleStep';
import {Row, Col} from 'antd';
export default class payment extends Component {
    createOrder() {
        console.log(this.props, '----');
        var data = localStorage.getItem("confirmOrder");
        var bookInfo = JSON.parse(data).bookInfo;
        const bookInfoList = [];
        bookInfo.map((bookItem)=>{
            var obj = __pick(bookItem,['bookId', 'count']);
            bookInfoList.push(obj);
        })
        var obj = {
            address: '重庆 重庆市 小红收',
            bookInfo: JSON.stringify(bookInfoList),
        }
        console.log(bookInfo)
        this.props.orderBoundAC.createOrder(obj);
        this.props.history.pushState(null,'/pay');
    }
    componentWillReciveProps(nextProps){
        if(nextProps.order.toJS().orderInfo.useId != undefined) {
            this.props.history.pushState(null,'/pay');
        }
    }
    render() {
        var data = localStorage.getItem("confirmOrder");
        var sumMon = JSON.parse(data).sumMon
        return(
            <div className="payment">
                <Row>
                  <Col span="8">
                      <img src={logoImg} href="/"/>
                  </Col>
                  <Col span="16" style={{marginTop: '15px'}}>
                      <SimpleStep stepIndex={parseInt("1")} />
                  </Col>
                </Row>
                <div className="address">
                    <h2>选择收货地址</h2>
                    <AddressCard />
                    <div className="adminAdressLink">
                      <a>使用新的地址</a>
                      <a>管理收货地址</a>
                    </div>
                    <h2>确认订单信息</h2>
                    <OrderTable {...this.props}/>
                    <p className="pay-money">实付款:<span className="pay-sumMon">￥{sumMon}</span></p>
                    <p className="submitButtonWrap">
                      <span className="linkToShop"><Link to="/shopCart">返回购物车修改</Link></span>
                      <a className="submitButton" onClick={this.createOrder.bind(this)}>提交订单</a>
                    </p>
                </div>
            </div>
        )
    }
}
class OrderTable extends Component {
    createBook() {
        var data = localStorage.getItem("confirmOrder");
        const list = [];
        if(data) {
            var orderInfo = JSON.parse(data).bookInfo;
            console.log('orderInfo', orderInfo);
            orderInfo.map((item)=>{
                list.push(
                    <tr>
                        <td style={{width: '300px'}}><img className="pay-img" src={item.bookInfo.cover}/>{item.bookInfo.bookName}</td>
                        <td>{item.bookInfo.aprice}</td>
                        <td>{item.shopCartInfo.count}</td>
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
                        <th style={{width: '300px'}}>商品信息</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>小计</th>
                    </tr>
                </thead>
                <tbody>
                  <tr className="OrderTable-row">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                {this.createBook()}
                </tbody>
            </table>
        )
    }
}
class AddressCard extends Component {
    render() {
        return(
            <div className="addressCard">
                <p>
                    <span>重庆/重庆</span>
                    <span>（小红 收）</span>
                </p>
                <p>
                    渝北龙溪红金路51号岭秀锦园3-1518983359954
                </p>
                <a>修改</a>
            </div>
        )
    }
}
