import React, { Component, PropTypes } from 'react';
import {Row, Col, Cascader, message,Modal,Icon} from 'antd';
import __assign from 'lodash/assign';
import __pick from 'lodash/pick';
export default class AddressModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
	        formValue: {
	            postion: [],
	            address: '',
	            mailNum: '',
	            name: '',
	            phone: '',
	            id: '',
	        },
	      }
	}
    changpePostion(value) {
     console.log(value);
     var obj = __assign({}, this.state.formValue);
     obj.postion = value
     this.setState({
         formValue: obj,
     })
  	}
  	changeText(e) {
     var obj = __assign({}, this.state.formValue);
     obj[e.target.id] = e.target.value;
     this.setState({
         formValue: obj,
     })
  }
  saveAdress() {
    const formValue = this.state.formValue;
    let regMail = /^[1-9][0-9]{5}$/;
    let regPhone = /^[1][358][0-9]{9}$/;
    if(formValue.postion.length < 0) {
        message.error('请选择地区')
    } else if(formValue.address == '') {
        message.error('请填写详细地址')
    }　else if(formValue.mailNum == '') {
         message.error('请填写邮政编码')
    } else if(!regMail.test(formValue.mailNum)) {
        console.log(formValue.mailNum, regMail, regMail.test(formValue.mailNum), '======')
        message.error('请填写正确格式的邮政编码');
    }else if(formValue.name == '') {
        message.error('请填写收货人姓名');
    }　else　if(formValue.phone == '') {
        message.error('请填写收货人联系电话');
    } else　if(!regPhone.test(formValue.phone)) {
            message.error('请填写正确格式的联系电话');
    } else {
        var obj = __assign({}, this.state.formValue);
        obj.postion = obj.postion.join('-');
        this.props.clientBoundAC.addAddress(obj);
        this.resetFormValue();
		this.props.closeAddressModal();
        message.success('已保存')
    }
  }
  resetFormValue() {
      var obj ={
          postion: [],
          address: '',
          mailNum: '',
          name: '',
          phone: '',
          id: '',
      }
      this.setState({
          formValue: obj,
      })
  	}
	componentWillReceiveProps(nextProps) {
		console.log('????',nextProps.isAdd)
		if(!nextProps.isAdd){
			let address = __assign({},nextProps.addressData);
			console.log('????',address)
			address.postion = address.postion.split('-');
	        this.setState({
	            formValue: address,
	        })
		}
	}
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
		return (
			<div>
			{
				this.props.visibility ?
				<div className="AddressModal">
					<div className="AddressModal-top">
						<h2 className="AddressModal-head">
						{this.props.isAdd ? <p>使用新地址</p> : <p>修改地址</p>}
						<a className="AddressModal-close" onClick={this.props.closeAddressModal}><Icon type="cross" /></a>
						</h2>
						<Row>
							<Col span="3" style={{textAlign: 'right', marginRight: '10px'}}>选择收货地区</Col>
							<Col span="20">
								<Cascader options={options}
										  onChange={this.changpePostion.bind(this)}
										  value={this.state.formValue.postion}/>
							</Col>
						</Row>
						<Row>
							<Col span="3" style={{textAlign: 'right', marginRight: '10px'}}><label>详细地址</label></Col>
							<Col span="10">
								<textarea className="ant-input ant-input-lg"
										  value={this.state.formValue.address}
										  id="address"
										  onChange={this.changeText.bind(this)}/>
							</Col>
						</Row>
						<Row>
							<Col span="3" style={{textAlign: 'right', marginRight: '10px'}}><label>邮政编码</label></Col>
							<Col span="10">
								<input className="ant-input"
										value={this.state.formValue.mailNum}
										id="mailNum"
										onChange={this.changeText.bind(this)}/>
							</Col>
						</Row>
						<Row>
							<Col span="3" style={{textAlign: 'right', marginRight: '10px'}}><label>收货人姓名</label></Col>
							<Col span="10">
								<input className="ant-input"
										value={this.state.formValue.name}
										id="name"
										onChange={this.changeText.bind(this)}/>
							</Col>
						</Row>
						<Row>
							<Col span="3" style={{textAlign: 'right', marginRight: '10px'}}><label>手机号</label></Col>
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
				</div>
				:
				""
			}
			</div>
		)
	}
}
