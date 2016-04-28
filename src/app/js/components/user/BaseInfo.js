import React, { Component } from 'react';
import {Row,Col, Radio, DatePicker,Input,Upload,Icon} from 'antd';
import __assign from 'lodash/assign'
const RadioGroup = Radio.Group;
export default class  BaseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: 'man',
      img: '',
      files: {},
    }
  }
  uploadImg(files,filesList) {
    var reader = new FileReader();
    console.log(__assign({}, files), '123====')
    if(files.file.response !== undefined) {
      this.setState({
        img: files.file.thumbUrl,
        files: files
      })
    }
  }
  hasError(files) {
    console.log(files.file.thumbUrl, '123456')
    this.setState({
      img: files.file.thumbUrl,
    })
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
              <img className="BaseInfo-headImg" src={this.state.img} />
              <Upload {...props} onSuccess={this.hasError.bind(this)}>
                <Icon type="plus" />
                <div>上传照片</div>
              </Upload>
            </Col>
          </Row>
          <Row>
            <div className="BaseInfo-content-row clearfix">
              <Col span="2">用户名:</Col>
              <Col span="10"><Input /></Col>
            </div>
          </Row>
          <Row>
            <div className="BaseInfo-content-row">
              <Col span="2">真实姓名:</Col>
              <Col span="10"><Input /></Col>
            </div>
          </Row>
          <Row>
            <div className="BaseInfo-content-row">
              <Col span="2">性别:</Col>
              <Col span="20">
                <RadioGroup value={this.state.sex}>
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
              <Col span="20"><DatePicker/></Col>
            </div>
          </Row>
        </div>
      </div>
    )
  }
}
