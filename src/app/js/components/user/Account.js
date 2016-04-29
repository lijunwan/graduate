import React, { Component } from 'react';
import {Row,Col,message} from 'antd';
import __assign from 'lodash/assign'
export default class  Account extends Component {
  constructor(props) {
    super(props);
    this.state ={
      formInfo: {
        prePass: '',
        newPass: '',
        newPassTwice: '',
      }
    }
  }
  updatePassWord() {
    const formInfo = this.state.formInfo;
    if(formInfo.prePass == '' || formInfo.newPass == '' || formInfo.newPassTwice == '') {
      message.error('请填写完整的信息');
    } else if(formInfo.newPass.length<6 || formInfo.newPass.length<6>20) {
      message.error('密码由6-20个字符组成')
    }
     else if(formInfo.newPass != formInfo.newPassTwice) {
      message.error('两次密码填写不一致');
    } else {
      this.props.clientBoundAC.updatePassWord(formInfo);
      var obj = {
        prePass: '',
        newPass: '',
        newPassTwice: '',
      }
      this.setState({
        formInfo: obj,
      })
    }
  }
  changePass(e) {
    var obj = __assign({}, this.state.formInfo);
    console.log(e.target.value)
    obj[e.target.id] = e.target.value;
    this.setState({
      formInfo: obj,
    })
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps, '???');
    const updatePassMess = nextProps.client.toJS().updatePass;
    if(updatePassMess.errorCode) {
      message.error('输入的原始密码不正确');
    }　else if(updatePassMess.data) {
      message.success('修改密码成功');
    }
  }
  render() {
    return(
      <div className="Account">
          <h2>账户设置</h2>
          <Row style={{marginTop: '10px'}}>
            <Col span="3" style={{textAlign: 'right',marginRight: '10px'}}><label className="Account-mess">请输入旧密码：</label></Col>
            <Col span="16">
              <input className="ant-input Account-input" 
                     type="password" 
                     id="prePass"  
                     autoComplete= {1<0} 
                     value={this.state.formInfo.prePass}
                     onChange={this.changePass.bind(this)}/>
            </Col>
          </Row>
          <Row style={{marginTop: '10px'}}>
            <Col span="3" style={{textAlign: 'right', marginRight: '10px'}}><label className="Account-mess">请输入新密码：</label></Col>
            <Col span="16">
              <input className="ant-input Account-input" 
                     type="password" 
                     id="newPass"  
                     autoComplete = {1<0} 
                     value={this.state.formInfo.newPass}
                     onChange={this.changePass.bind(this)}/>
            </Col>
          </Row>
          <Row style={{marginTop: '10px'}}>
            <Col span="3" style={{textAlign: 'right',marginRight: '10px'}}><label className="Account-mess">请再次输入新密码:</label></Col>
            <Col span="16">
              <input className="ant-input Account-input" 
                     type="password" id="newPassTwice" 
                     autoComplete= {1<0} 
                     value={this.state.formInfo.newPassTwice}
                     onChange={this.changePass.bind(this)}/>
            </Col>
          </Row>
          <input type="button" className="Account-save" value="提交" onClick={this.updatePassWord.bind(this)}/>
      </div>
    )
  }
}
