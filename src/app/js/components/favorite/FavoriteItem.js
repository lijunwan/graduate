import React, { Component, PropTypes } from 'react';
import {Col} from 'antd';
import __keys from 'lodash/keys';
export default class  FavoriteItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    }
  }
  showBook(bookId) {
    this.props.history.pushState(null, '/book/'+ bookId)
  }
  delFavorite(bookId) {
    this.props.favoriteBoundAC.delFavorite({bookId: bookId})
  }
  render() {
    const data = this.props.data;
    const isEmety = __keys(data.bookInfo).length < 1 ? true : false;
    return(
      <div>
      {
        isEmety ?
        <Col span="4" style={{width: '160', marginRight: '20px', position: 'relative'}}>
          <div className="favoriteItem">
            <a className="trash" onClick={this.delFavorite.bind(this, data.favorite.bookId)}><i className="fa fa-trash-o" style={{fontSize: '18px'}}></i></a>
            <div style={{border: '1px solid #EFE7E7',padding: '10px'}}><img src={data.favorite.cover} style={{width: '140'}}/></div>
            <p style={{textAlign: 'center',margin: '10px auto'}}><a style={{color: '#3c3c3c'}}>{data.bookInfo.bookName}</a></p>
            <p style={{textAlign: 'center',margin: '10px auto'}}>宝贝已失效</p>
          </div>
        </Col>
        :
         <Col span="4" style={{width: '160', marginRight: '20px', position: 'relative'}}>
        <div className="favoriteItem">
          <a className="trash" onClick={this.delFavorite.bind(this, data.favorite.bookId)}><i className="fa fa-trash-o" style={{fontSize: '18px'}}></i></a>
          <div style={{border: '1px solid #EFE7E7',padding: '10px'}}><img src={data.bookInfo.cover} style={{width: '140'}}/></div>
          <p style={{textAlign: 'center',margin: '10px auto'}}><a className="bookName"onClick={this.showBook.bind(this, data.favorite.bookId)}>{data.bookInfo.bookName}</a></p>
          <p style={{textAlign: 'center',margin: '10px auto'}}>￥{data.bookInfo.aprice}</p>
        </div>
      </Col>
      }
    </div>
    )
  }
}
