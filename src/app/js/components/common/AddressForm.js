import React, { Component } from 'react';
import {Row, Col,Cascader,message,Modal} from 'antd';
export default class AddressForm extends Component {
	render() {
		 const options = [{
	      value: '浙江',
	      label: '浙江',
	      children: [{
	        value: '杭州',
	        label: '杭州',
	        children: [{
	          value: '西湖',
	          label: '西湖',
	        }],
	      }],
	    }, {
	      value: '江苏',
	      label: '江苏',
	      children: [{
	        value: '南京',
	        label: '南京',
	        children: [{
	          value: '中华门',
	          label: '中华门',
	        }],
	      }],
	    }];
		return(
			<div className="AddressModal">
				<Row>
		            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}>选择收货地区</Col>
		            <Col span="20">
		                <Cascader options={options}
		                          onChange={this.changpePostion.bind(this)}
		                          value={this.state.formValue.postion}/>
		            </Col>
		        </Row>
		        <Row>
		            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}><label>详细地址</label></Col>
		            <Col span="10">
		                <textarea className="ant-input ant-input-lg"
		                          value={this.state.formValue.address}
		                          id="address"
		                          onChange={this.changeText.bind(this)}/>
		            </Col>
		        </Row>
		        <Row>
		            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}><label>邮政编码</label></Col>
		            <Col span="10">
		                <input className="ant-input"
		                        value={this.state.formValue.mailNum}
		                        id="mailNum"
		                        onChange={this.changeText.bind(this)}/>
		            </Col>
		        </Row>
		        <Row>
		            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}><label>收货人姓名</label></Col>
		            <Col span="10">
		                <input className="ant-input"
		                        value={this.state.formValue.name}
		                        id="name"
		                        onChange={this.changeText.bind(this)}/>
		            </Col>
		        </Row>
		        <Row>
		            <Col span="2" style={{textAlign: 'right', marginRight: '10px'}}><label>手机号</label></Col>
		            <Col span="10">
		                <input className="ant-input"
		                        value={this.state.formValue.phone}
		                        id="phone"
		                        onChange={this.changeText.bind(this)} />
		            </Col>
		        </Row>
		        <input className="Address-save"
		               value="保存"
		               type="button"
		               onClick={this.saveAdress.bind(this)} />
			</div>
		)
	}
}