import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
export default class payment extends Component {
    render() {
        return(
            <div>
                <div><img src={logoImg} /></div>
                <div className="address">
                    <h2>选择收货地址</h2>
                    <AddressCard />
                    <h2>确认订单信息</h2>
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
            var orderInfo = JSON.parse(data);
            orderInfo.map((item)=>{

            })
        }
    }
    render() {
        return(
            <table>
                <thead>
                    <th>
                        <td></td>
                        <td>单价</td>
                        <td>数量</td>
                        <td>小计</td>
                    </th>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}
class AddressCard extends Component {
    render() {
        return(
            <div>
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
