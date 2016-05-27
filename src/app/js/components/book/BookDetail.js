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
          <Col span="8">版次:{this.props.data.edtions}</Col>
          <Col span="8">页数:{this.props.data.pages}</Col>
          <Col span="8">字数:{this.props.data.words}</Col>
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
