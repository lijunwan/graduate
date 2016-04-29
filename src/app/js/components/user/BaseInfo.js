import React, { Component } from 'react';
import {Row,Col, Radio, DatePicker,Input,Icon} from 'antd';
import Upload from '../common/Upload';
import __assign from 'lodash/assign';
import __pick from 'lodash/pick';
import moment from 'moment';
const RadioGroup = Radio.Group;
var uploadInput;
export default class  BaseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseInfo:{
        sex: 'man',
        name: '',
        userName: '',
        birthday: '',
      },
      headImg: '',
    }
  }
  onChange(imgData) {
    console.log(imgData, '????')
    this.setState({
      headImg: imgData
    })
  }
  changeSex(e) {
    var obj = __assign({}, this.state.baseInfo)
    obj.sex =  e.target.value;
    this.setState({
      baseInfo: obj,
    })
  }
  inputChange(e) {
    var obj = __assign({}, this.state.baseInfo);
    obj[e.target.id] = e.target.value;
    this.setState({
      baseInfo: obj,
    })
  }
  onChangeBirth(birthday) {
    var obj = __assign({}, this.state.baseInfo)
    obj.birthday =  birthday;
    this.setState({
      baseInfo: obj,
    })
  }
  saveBaseInfo() {
    console.log(this.state.baseInfo,'baseInfo--');
    var obj =  __assign({}, this.state.baseInfo);
    console.log(moment(this.state.baseInfo.birthday).format("YYYY-MM-DD"), '???baseInfo')
    obj.birthday = moment(this.state.baseInfo.birthday).format("YYYY-MM-DD");
    this.props.clientBoundAC.updateUserInfo(obj);
    var file = uploadInput.files[0];
    if(file) {
      var xhr = new XMLHttpRequest();
      var formData = new FormData();
      xhr.open("post", '/api/user/authorization/headImages', true);
      formData.append('file',file);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send(formData);
    }
  }
  componentWillReceiveProps(nextProps) {
    const  userInfoData = nextProps.client.toJS().userInfo.data;
    var userInfo = __pick(userInfoData, ['sex','name','userName','birthday']);
    console.log(userInfo, 'userInfo---')
    this.setState({
      baseInfo: userInfo
    })
    if(userInfoData.headImg) {
      this.setState({
        headImg:userInfoData.headImg,
      })
    }
  }
  componentDidMount() {
    this.props.clientBoundAC.getUserInfo();
  }
  render() {
    const props = {
      action: '/api/user/authorization/headImages',
      listType: 'picture-card',
    }
    return(
      <div className="BaseInfo">
        <h2>基本资料</h2>
        <div className="BaseInfo-content">
          <Row>
            <Col span="2">当前头像：</Col>
            <Col span="20">
              <img className="BaseInfo-headImg" src={this.state.headImg} />
              <Upload onChange={this.onChange.bind(this)}>
              </Upload>
            </Col>
          </Row>
          <Row>
            <div className="BaseInfo-content-row clearfix">
              <Col span="2">用户名:</Col>
              <Col span="10">
                <input className='ant-input' id="userName" value={this.state.baseInfo.userName} onChange={this.inputChange.bind(this)}/>
              </Col>
            </div>
          </Row>
          <Row>
            <div className="BaseInfo-content-row">
              <Col span="2">真实姓名:</Col>
              <Col span="10">
                <input className='ant-input' id='name' value={this.state.baseInfo.name} onChange={this.inputChange.bind(this)} />
              </Col>
            </div>
          </Row>
          <Row>
            <div className="BaseInfo-content-row">
              <Col span="2">性别:</Col>
              <Col span="20">
                <RadioGroup defaultValue="man" value={this.state.baseInfo.sex} onChange={this.changeSex.bind(this)}>
                  <Radio key="man" value="man">男</Radio>
                  <Radio key="woman" value="woman">女</Radio>
                  <Radio key="other" value="other">其他</Radio>
                </RadioGroup>
              </Col>
            </div>
          </Row>
          <Row>
            <div className="BaseInfo-content-row">
              <Col span="2">生日:</Col>
              <Col span="20"><DatePicker onChange={this.onChangeBirth.bind(this)} value={this.state.baseInfo.birthday}/></Col>
            </div>
          </Row>
          <input className="BaseInfo-save" value="保存" onClick={this.saveBaseInfo.bind(this)}></input>
        </div>
      </div>
    )
  }
}
