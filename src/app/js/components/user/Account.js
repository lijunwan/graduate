import React, { Component } from 'react';
import {Row,Col,message} from 'antd';
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
    if(this.state.formInfo.prePass == '' || this.state.formInfo.newPass == '' || this.state.formInfo.newPassTwice == '') {
      message.error('请填写完整的信息');
    } else if(this.state.newPass != this.state.newPassTwice) {
      message.error('两次密码填写不一致');
    } else {
      this.props.clientBoundAC.updatePassWord(this.state);
      this.setState({
        prePass: '',
        newPass: '',
        newPassTwice: '',
      })
    }
  }
  changePass(e) {
    var obj = __assign({}, this.state);
    var obj[e.target.id] = e.target.value;
    this.set
  }
  render() {
    return(
      <div className="Account">
          <h2>账户设置</h2>
          <Row style={{marginTop: '10px'}}>
            <Col span="3" style={{textAlign: 'right',marginRight: '10px'}}><label className="Account-mess">请输入旧密码：</label></Col>
            <Col span="16">
              <input className="ant-input Account-input" type="password" id="prePass"  autoComplete= {1<0} onChange={this.changePass.bind(this)}/>
            </Col>
          </Row>
          <Row style={{marginTop: '10px'}}>
            <Col span="3" style={{textAlign: 'right', marginRight: '10px'}}><label className="Account-mess">请输入新密码：</label></Col>
            <Col span="16">
              <input className="ant-input Account-input" type="password" id="newPass"  autoComplete = {1<0} onChange={this.changePass.bind(this)}/>
            </Col>
          </Row>
          <Row style={{marginTop: '10px'}}>
            <Col span="3" style={{textAlign: 'right',marginRight: '10px'}}><label className="Account-mess">请再次输入新密码:</label></Col>
            <Col span="16">
              <input className="ant-input Account-input" type="password" id="newPassTwice" autoComplete= {1<0} onChange={this.changePass.bind(this)}/>
            </Col>
          </Row>
          <input type="button" className="Account-save" value="提交" onClick={this.updatePassWord.bind(this)}/>
      </div>
    )
  }
}
