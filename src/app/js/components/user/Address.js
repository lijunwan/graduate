import React, { Component } from 'react';
import {Row, Col,Cascader,message,Modal} from 'antd';
const confirm = Modal.confirm;
import __assign from 'lodash/assign';
import __pick from 'lodash/pick';
export default class  Address extends Component {
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
        delAddressId: '',
        isShowDelModal: false,
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
  showDelModal(id) {
      this.setState({
          isShowDelModal: true,
          delAddressId: id,
      })
  }
  handleOk() {
      var obj ={
          addressId: this.state.delAddressId
      }
      this.props.clientBoundAC.delAddress(obj);
      this.setState({
          isShowDelModal: false,
      })
  }
  handleCancel() {
      this.setState({
          isShowDelModal: false,
      })
  }
  modifyAddress(address) {
      address.postion = address.postion.split('-');
      this.setState({
          formValue: address,
      })
  }
  createAddress() {
      const address = this.props.client.toJS().addressList.data;
      const list = [];
      if(address && address.length>0) {
          address.map((obj, index)=>{
              list.push(
                  <tr>
                    <td>{obj.name}</td>
                    <td>{obj.postion}</td>
                    <td>{obj.address}</td>
                    <td>{obj.phone}</td>
                    <td><a onClick={this.showDelModal.bind(this,obj['_id'])}>删除</a>|<a onClick={this.modifyAddress.bind(this, obj)}>修改</a></td>
                  </tr>
              );
          })
      }else {
          list.push(
              <tr style={{textAlign: 'center'}}>
                <td colSpan="5">
                    无记录
                </td>
              </tr>
          )
      }
      return list;
  }
  componentDidMount() {
      this.props.clientBoundAC.getAddress();
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
    return(
      <div className="Address">
        <h2>收货地址管理</h2>
        <h3>添加新地址</h3>
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
        <h3>我的地址</h3>
        <table className="ant-table">
            <thead>
                <tr>
                    <th>收货人</th>
                    <th>所在地区</th>
                    <th>详细地址</th>
                    <th>联系电话</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {this.createAddress()}
            </tbody>
        </table>
        <Modal title="确认信息" visible={this.state.isShowDelModal}
          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
          <p>是否删除改地址？</p>
        </Modal>
      </div>
    )
  }
}
