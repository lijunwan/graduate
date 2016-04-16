import React, { Component, PropTypes } from 'react';
import '../../../css/book/book.css';
import NumberBox from './NumberBox'
import ImgShow from './ImgShow';
import BookTab from './BookTab';
import BookDetail from './BookDetail'
import {Icon, Row, Col} from 'antd';
export default class  Book extends Component{
    constructor(props) {
      super(props);
      this.sate = {
        showContent: 'bookDetai',
      }
    }
    componentDidMount () {
        console.log(this.props, '====')
        if(this.props.params.bookId) {
            this.props.bookeBoundAC.getBookInfo(this.props.params.bookId)
        }
    }
    modifyMoney (value) {
      return Math.round(value).toFixed(2);
    }
    render() {
        const bookInfo = this.props.bookInfo.toJS().bookInfo;
        if(bookInfo.data) {
            console.log('=====', bookInfo);
            const money = this.modifyMoney(bookInfo.data.price);
            const salePrice = this.modifyMoney(bookInfo.data.price * (bookInfo.data.discount * 0.1));
            return(
                <div className="Book clearfix">
                    <div className="Book-infor">
                        <div className="Book-img">
                            <ImgShow data = {bookInfo.data.picture}/>
                        </div>
                        <div className="Book-basic-info clearfix">
                          <div className="Info-box">
                            <p className="Info-bookName">{bookInfo.data.bookName}</p>
                            <p className="Info-pub">
                                <span className= "Info-pub-item">作者：{bookInfo.data.author}</span>
                                <span className= "Info-pub-item">出版社：{bookInfo.data.pubHouse}</span>
                                <span className= "Info-pub-item">出版时间：{bookInfo.data.pubDate}</span>
                            </p>
                            <div className="price-info">
                              <p><span className="price-key letter02">定价</span> <span><s>￥{money}</s></span></p>
                              <p><span className="price-key letter01 marginRight">折扣价</span><span className="price-money">￥{salePrice}</span><span className="marginLeft">({bookInfo.data.discount}折)</span></p>
                            </div>
                            <div style={{paddingTop: '30px'}}>
                              <NumberBox maxNumber= {parseInt(100)} />
                            </div>
                            <a className="Book-button shop-button">加入购物车</a>
                            <a className="Book-button buy-button">一建购买</a>
                            <p style={{marginTop: '20px'}}>
                              <a className=" anticon anticon-star Book-start" style={{marginRight: '5px'}} type="star-o" />
                              <span className="star-text">收藏商品(人气1133)</span>
                            </p>
                          </div>
                        </div>
                    </div>
                    <div className="clearfix" style={{marginTop : '20px'}}>
                      <div className="recommend">推荐区</div>
                      <div className="book-detai">
                        <h3  className="BookDetai-blockName">商品详情</h3>
                        <div className="detail-content clearfix">
                            <BookDetail {...this.props} data={bookInfo.data}/>
                        </div>
                        <h3  className="BookDetai-blockName" style={{marginTop: '20px'}}>商品评价</h3>
                        <div className="detail-content clearfix">
                        </div>
                      </div>
                    </div>
                </div>
            )
        }
        return (<div>...</div>)
    }
}
