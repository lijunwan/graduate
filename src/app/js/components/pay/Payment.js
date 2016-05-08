import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import logoImg from '../../../images/logo.jpg';
import '../../../css/payment.css';
import __pick from 'lodash/pick';
import SimpleStep from '../common/SimpleStep';
import {Row, Col} from 'antd';
import AddressModal from './AddressModal'
export default class payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressCard: 0,
            isShowAddrModal: false,
            addressData: {},
            isAdd: true,//用于识别是添加还是修改地址
        }
    }
    createOrder() {
        var data = localStorage.getItem("confirmOrder");
        var bookInfo = JSON.parse(data).bookInfo;
        const userInfo = this.props.client.toJS().info.data;
        const bookInfoList = [];
        bookInfo.map((bookItem)=>{
            var obj = __pick(bookItem.shopCartInfo,['bookId', 'count','_id']);
            bookInfoList.push(obj);
        })
        var obj = {
            address: JSON.stringify(userInfo.ShippingAddress[this.state.addressCard]),
            bookInfo: JSON.stringify(bookInfoList),
        }
        console.log(bookInfo)
        this.props.orderBoundAC.createOrder(obj);
    }
    componentWillReceiveProps(nextProps){
      const orderInfo = nextProps.order.toJS().orderInfo.data;
      console.log('===',orderInfo);
        if(orderInfo && orderInfo.length > 0) {
            localStorage.setItem('orderInfo', JSON.stringify(orderInfo))
            this.props.history.pushState(null,'/pay');
        }
    }
    choiceAddress(index) {
        this.setState({
            addressCard: index,
        })
    }
    createAddressCard() {
        const address = this.props.client.toJS().addressList.data;
        const list = [];
        if(address){
            address.map((address,index)=>{
                let isActive = this.state.addressCard == index ? true : false;
                 list.push(
                    <Col span="5">
                        <div onClick={this.choiceAddress.bind(this, index)}>
                        <AddressCard data={address}
                                    isActive={isActive}
                                    modifyAddress={this.modifyAddress.bind(this)}/>
                        </div>
                    </Col>
                )
            })
        }
        return list;
    }
    modifyAddress() {
        const address = this.props.client.toJS().addressList.data;
        this.setState({
            isShowAddrModal: true,
            isAdd: false,
            addressData: address[this.state.addressCard]
        })
    }
    addAddressHandel() {
        this.setState({
            isShowAddrModal: true,
            addressData: {},
            isAdd: true,
        })
    }
    closeAddressModal() {
        this.setState({
            isShowAddrModal: false,
        })
    }
    componentDidMount() {
        this.props.clientBoundAC.getAddress();
    }
    redirectPerson() {
        this.props.history.pushState(null, '/user');
        localStorage.setItem("userMenu", 'address');
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
                    <Row>{this.createAddressCard()}</Row>
                    <div className="adminAdressLink">
                      <a onClick={this.addAddressHandel.bind(this)}>使用新的地址</a>
                      <a onClick={this.redirectPerson.bind(this)}>管理收货地址</a>
                    </div>
                    <h2>确认订单信息</h2>
                    <OrderTable {...this.props}/>
                    <p className="pay-money">实付款:<span className="pay-sumMon">￥{sumMon}</span></p>
                    <p className="submitButtonWrap">
                      <span className="linkToShop"><Link to="/shopCart">返回购物车修改</Link></span>
                      <a className="submitButton" onClick={this.createOrder.bind(this)}>提交订单</a>
                    </p>
                </div>
                <AddressModal visibility={this.state.isShowAddrModal}
                              isAdd={this.state.isAdd}
                              addressData = {this.state.addressData}
                              closeAddressModal = {this.closeAddressModal.bind(this)}
                              {...this.props} />
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
        const data = this.props.data;
        const cardClass = this.props.isActive ? 'addressCard active' : 'addressCard'
        return(
            <div className={cardClass}>
                <p>
                    <span>{data.postion}</span>
                    <span>（{data.name} 收）</span>
                </p>
                <p>
                    {data.address}-{data.phone}
                </p>
                {
                    this.props.isActive ?
                    <a onClick={this.props.modifyAddress}>修改</a>
                    : ""
                }
            </div>
        )
    }
}
