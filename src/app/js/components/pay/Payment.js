import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/payment.css';
export default class payment extends Component {
    render() {
        var data = localStorage.getItem("confirmOrder");
        var sumMon = JSON.parse(data).sumMon
        return(
            <div className="payment">
                <div><img src={logoImg} href="/"/></div>
                <div className="address">
                    <h2>选择收货地址</h2>
                    <AddressCard />
                    <a>使用新的地址</a>
                    <a>管理收货地址</a>
                    <h2>确认订单信息</h2>
                    <OrderTable {...this.props}/>
                    <p>实付款<span>￥{sumMon}</span></p>
                    <p><a>提交订单</a></p>
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
<<<<<<< HEAD
            var orderInfo = JSON.parse(data);
            console.log('-------',orderInfo)
            orderInfo.map((item)=>{
                <tr>
                    <td></td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>小计</td>
                </tr>
=======
            var orderInfo = JSON.parse(data).bookInfo;
            orderInfo.map((item)=>{
                list.push(
                    <tr>
                        <td style={{width: '300px'}}><img className="pay-img" src={item.cover}/>{item.bookName}</td>
                        <td>{item.aprice}</td>
                        <td>{item.count}</td>
                    </tr>
                )
>>>>>>> 28fba864881e09d1c0a269079cf3b0808056d107
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
