import React, { Component, PropTypes } from 'react';
import {Row, Col, Checkbox, Pagination} from 'antd';
import logoImg from '../../../images/logo.jpg';
import Search from '../common/Search';
import FavoriteItem from './FavoriteItem';
import '../../../css/favorite.css'
export default class  Favorite extends Component {
  createFavorite() {
    console.log(this.props.favorite.toJS().favorite.data,'????');
    const favoriteData = this.props.favorite.toJS().favorite.data;
    const list =[];
    if(favoriteData){
      favoriteData.map((data, index)=>{
        list.push(
          <FavoriteItem {...this.props} data={data} key={index}/>
        )
      })
    }
    return list;
  }
  componentDidMount() {
    this.props.favoriteBoundAC.getFavorite();
  }
  render() {
    return(
      <div>
        <Row style={{margin: '30px auto 0',width: '1200px'}}>
          <Col span="8">
            <img src={logoImg} alt=""/>
          </Col>
          <Col span="16" style={{marginTop: '10px'}}>
            <Search {...this.props}/>
          </Col>
        </Row>
        <hr style={{border: 'none', borderBottom: '4px solid #ff2832', margin: '30px auto'}}></hr>
        <Row style={{margin: '30px auto 0',width: '1200px', height: '35px',}}>
          <Col span="2">
            排序 时间
          </Col>
          <Col span="19">
            仅显示 降价 <Checkbox/> 促销 <Checkbox/> 缺货 <Checkbox/>
          </Col>
          <Col span="3">
            <Pagination simple defaultCurrent={2} total={50} />
          </Col>
        </Row>
        <Row style={{margin: '30px auto 0',width: '1200px'}}>
          <div>
            {this.createFavorite()}
          </div>
        </Row>
      </div>
    )
  }
}
