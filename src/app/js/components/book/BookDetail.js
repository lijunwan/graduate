import React, { Component, PropTypes } from 'react';
import {Row, Col} from 'antd';
export default class  BookDetai extends Component{
  constructor(props) {
    super(props);
  }
  createCom(data) {
      const list = [];
      data.map((itme) => {
          list.push(<p>{data}</p>);
      });
      return list;
  }
  render() {
    return (
      <div>
        <Row style={{marginBottom: '10px'}}>
          <Col span="8">版次:1</Col>
          <Col span="8">页数:730</Col>
          <Col span="8">字数:1092000</Col>
        </Row>
        <Row style={{marginBottom: '10px'}}>
          <Col span="8">印刷时间: 2012-3-1</Col>
          <Col span="8">开本: 16开</Col>
          <Col span="8">纸张: 胶版纸</Col>
        </Row>
        <Row style={{marginBottom: '10px'}}>
          <Col span="8">印次: 1</Col>
          <Col span="8">包装: 平装</Col>
          <Col span="8">丛书名:</Col>
        </Row>
        <div className="BookDetai-recom">
            <h3>内容推荐</h3>
            <div className="BookDetai-content">{this.createCom(this.props.data.introduce)}</div>
        </div>
        <div className="BookDetai-recom">
            <h3>作者简介</h3>
            <div className="BookDetai-content">{this.createCom(this.props.data.authorIntro)}</div>
        </div>
      </div>
    )
  }
}
