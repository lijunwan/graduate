import React, { Component, PropTypes } from 'react';
import {Row,Col} from 'antd';
import SimpleStep from '../common/SimpleStep';
import SearchBar from '../common/SearchBar';
import '../../../css/order.css';
export default class OrderDetail extends Component {
  componentDidMount() {
    console.log(this.props.params.orderId,'====')
    this.props.orderBoundAC.getOrderInfo({orderId: this.props.params.orderId})
  }
  showBookInfo(bookId) {
    this.props.history.pushState(null, '/book/'+bookId);
  }
  render() {
    const orderInfo = this.props.order.toJS().singleOrder.data;
    if(orderInfo) {
      const statusConfig = {
        'UNPAY': 0,
        'UNSEND': 1,
        'UNCONFIRM': 2,
        'UNEVALUATION': 3,
        'SUCCESS': 4,
      }
      const payStatusConfig = {
  			'UNPAY': '未支付',
  			'UNSEND': '买家已支付等待卖家发货'
  		}
      return(
        <div className="OrderDetail">
          <div style={{margin: '30px 0'}}>
            <SearchBar {...this.props}/>
          </div>
          <div>
            您的位置：我的订单／订单详情
          </div>
          <div style={{margin: '30px 0'}}>
            <SimpleStep stepIndex={statusConfig[orderInfo.orderStatus]} />
          </div>
          <h2>订单信息</h2>
          <Row>
            <Col span="2">收货地址:</Col>
            <Col span="20">{orderInfo.address}</Col>
          </Row>
          <Row>
            <Col span="2">订单编号:</Col>
            <Col span="20">{orderInfo['_id']}</Col>
          </Row>
          <Row>
            <Col span="2">创建时间:</Col>
            <Col span="20">{orderInfo.time.split('T')[0]}</Col>
          </Row>
          <h2>商品信息</h2>
          <table  className="OrderDetail-bookInfo">
            <thead>
              <tr>
                <th>商品</th>
                <th>单价</th>
                <th>数量</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src={orderInfo.cover} alt=""/>
                  <a onClick={this.showBookInfo.bind(this, orderInfo.bookId)}>{orderInfo.bookName}</a>
                </td>
                <td style={{textAlign: 'center'}}>
                  {orderInfo.aprice}
                </td>
                <td style={{textAlign: 'center'}}>
                  {orderInfo.count}
                </td>
                <td style={{textAlign: 'center'}}>
                  {payStatusConfig[orderInfo.orderStatus]}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="OrderDetail-sumMon">实付款：{(orderInfo.sumMon).toFixed(2)}<span></span></div>
        </div>
      )
    }
    return(
      <div>...</div>
    )
  }
}
