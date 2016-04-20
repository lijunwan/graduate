import React, { Component, PropTypes } from 'react';
import {Row, Col} from 'antd';
import logoImg from '../../../images/logo.jpg';
import Search from '../common/Search'
export default class  Favorite extends Component {
  createFavorite() {

  }
  componentDidMount() {
    
  }
  render() {
    return(
      <div>
        <Row style={{marginTop: '30px'}}>
          <Col span="8">
            <img src={logoImg} alt=""/>
          </Col>
          <Col span="16" style={{marginTop: '10px'}}>
            <Search />
          </Col>
        </Row>
        <div>排序 时间 仅显示 降价 促销 缺货</div>
        <Row>
          <div>
            {this.createFavorite()}
          </div>
        </Row>
      </div>
    )
  }
}
