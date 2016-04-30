import React, { Component } from 'react';
import {Row, Col} from 'antd';
export default class  Address extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="Address">
        <h2>收货地址管理</h2>
        <Row>
            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}>选择收货地区</Col>
            <Col span="20"></Col>
        </Row>
        <Row>
            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}><label>详细地址</label></Col>
            <Col span="10">
                <input className="ant-input" />
            </Col>
        </Row>
        <Row>
            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}><label>邮政编码</label></Col>
            <Col span="10">
                <input className="ant-input" />
            </Col>
        </Row>
        <Row>
            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}><label>收货人姓名</label></Col>
            <Col span="10">
                <input className="ant-input" />
            </Col>
        </Row>
        <Row>
            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}><label>手机号</label></Col>
            <Col span="10">
                <input className="ant-input" />
            </Col>
        </Row>
        <input className="Address-save" value="保存" />
      </div>
    )
  }
}
