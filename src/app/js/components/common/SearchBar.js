import React, { Component, PropTypes } from 'react';
import Search from './Search';
import logoImg from '../../../images/logo.jpg';
import {Row, Col} from 'antd';
export default class SearchBar extends Component {
	render() {
		return (
		<Row style={{margin: '30px auto 0',width: '1200px'}}>
          <Col span="8">
            <a href="/"><img src={logoImg} alt=""/></a>
          </Col>
          <Col span="16" style={{marginTop: '10px'}}>
            <Search {...this.props}/>
          </Col>
        </Row>
		)
	}
}
