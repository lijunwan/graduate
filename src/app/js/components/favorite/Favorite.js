import React, { Component, PropTypes } from 'react';
import {Row, Col, Checkbox, Pagination} from 'antd';
import logoImg from '../../../images/logo.jpg';
import Search from '../common/Search';
import FavoriteItem from './FavoriteItem';
import '../../../css/favorite.css';
import __slice from 'lodash/slice'
export default class  Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentData: [],
      oriData:[],
      curentPate: 1,
      pageSize: 48,
      totalPage: 0,
    }
  }
  createFavorite() {
    const favoriteData = this.state.curentData;
    const list =[];
    console.log(favoriteData);
    if(favoriteData){
      favoriteData.map((data, index)=>{
        list.push(
          <FavoriteItem {...this.props} data={data} key={index}/>
        )
      })
    }
    return list;
  }
  componentWillReceiveProps(nextProps) {
    const favoriteData = nextProps.favorite.toJS().favorite.data;
    console.log(favoriteData,'???/456')
    if(favoriteData) {
      this.setState({
        curentData: this.getCurentData(favoriteData, 1, this.state.pageSize),
        oriData: favoriteData,
      })
    }
  }
   getCurentData(data, current, pageSize) {
      const start = (current-1) * pageSize;
      const end = start + pageSize;
      const dataCuren = __slice(data,start, end);
      console.log('---',dataCuren,data, current,pageSize)
      return dataCuren;
  }
  componentDidMount() {
    this.props.favoriteBoundAC.getFavorite();
  }
  changePage(value) {
    this.setState({
      curentData: this.getCurentData(this.state.oriData, value, this.state.pageSize),
      curentPate: value,
    })
  }
  render() {
    return(
      <div>
        <Row style={{margin: '30px auto 0',width: '1200px'}}>
          <Col span="8">
            <a href="/"><img src={logoImg} alt=""/></a>
          </Col>
          <Col span="16" style={{marginTop: '10px'}}>
            <Search {...this.props}/>
          </Col>
        </Row>
        <hr style={{border: 'none', borderBottom: '4px solid #ff2832', margin: '30px auto'}}></hr>
        <h2>我的收藏夹</h2>
        <Row style={{margin: '30px auto 0',width: '1200px'}}>
          <div>
            {this.createFavorite()}
          </div>
        </Row>
        <Row style={{margin: '30px auto 0',width: '1200px', height: '35px',}}>
          <Col span="3">
            <Pagination simple 
                        defaultCurrent={1} 
                        pageSize={this.state.pageSize}  
                        total={this.state.oriData.length} 
                        current={this.state.curentPate}
                        onChange={this.changePage.bind(this)}/>
          </Col>
        </Row>
      </div>
    )
  }
}
