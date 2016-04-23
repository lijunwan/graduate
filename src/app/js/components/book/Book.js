import React, { Component, PropTypes } from 'react';
import '../../../css/book/book.css';
import NumberBox from './NumberBox'
import ImgShow from './ImgShow';
import BookTab from './BookTab';
import BookDetail from './BookDetail'
import {Icon, Row, Col} from 'antd';
import logoImg from '../../../images/logo.jpg';
import Search from '../common/Search'
export default class  Book extends Component{
    constructor(props) {
      super(props);
      this.state = {
        showContent: 'bookDetai',
        count: 1,
        isFavorite: false,
        favoriteLen: 0,
      }
    }
    componentDidMount () {
        console.log(this.props, '====')
        if(this.props.params.bookId) {
            this.props.bookeBoundAC.getBookInfo(this.props.params.bookId)
        }
    }
    componentWillReceiveProps(nextProps) {
      const bookInfo = nextProps.bookInfo.toJS().bookInfo.data;
      const userId = nextProps.client.toJS().info.id;
      const favoriteMess = nextProps.favorite.toJS().addFavoriteMess.data;
      if(bookInfo && bookInfo.favorite) {
        bookInfo.favorite.map((favorUserId)=>{
          if(favorUserId == userId){
              this.setState({
                isFavorite: true,
                favoriteLen: bookInfo.favorite.length,
              })
          }
        });
      }
      if(favoriteMess && favoriteMess.bookId) {
        this.setState({
          isFavorite: true,
          favoriteLen: this.state.favoriteLen+1,
        })
      }
    }
    modifyMoney (value) {
      return Math.round(value).toFixed(2);
    }
    addBookIntoCars() {
        var obj = {
            bookId: this.props.params.bookId,
            count: this.state.count,
        }
        this.props.clientBoundAC.addBookIntoCars(obj);
    }
   addNumber() {
    this.setState({
      count: this.state.count + 1,
    })
  }
  subNumber() {
    if(this.state.count>1) {
      this.setState({
        count: this.state.count - 1,
      })
    }
  }
  addFavorite() {
    var obj = {
      bookId : this.props.params.bookId,
    };
    if(!this.state.isFavorite) {
      this.props.favoriteBoundAC.addFavorite(obj);
      this.setState({
        isFavorite: true,
      })
    }
  }
    render() {
        const bookInfo = this.props.bookInfo.toJS().bookInfo;
        const favoriteStarClass = this.state.isFavorite ? 'anticon anticon-star Book-start-active' : 'anticon anticon-star Book-start';
        const favoriteText = this.state.isFavorite ? '已收藏' : '收藏商品';
        if(bookInfo.data) {
            const money = this.modifyMoney(bookInfo.data.price);
            return(
                <div>
                  <div className="Index-header clearfix" style={{width:'1200px',margin: '50px auto'}}>
          					<a href="/"><img src={logoImg} alt=""/></a>
          				<div className="Index-search">
          					<Search {...this.props} />
          				</div>
                </div>
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
                              <p><span className="price-key letter01 marginRight">折扣价</span><span className="price-money">￥{bookInfo.data.aprice}</span><span className="marginLeft">({bookInfo.data.discount}折)</span></p>
                            </div>
                            <div style={{paddingTop: '30px'}}>
                              <NumberBox maxNumber= {parseInt(100)}
                                         count={this.state.count}
                                         addNumber={this.addNumber.bind(this)}
                                         subNumber={this.subNumber.bind(this)}/>
                            </div>
                            <a className="Book-button shop-button" onClick = {this.addBookIntoCars.bind(this)}>加入购物车</a>
                            <a className="Book-button buy-button">一建购买</a>
                            <p style={{marginTop: '20px'}}>
                              <a className={favoriteStarClass} style={{marginRight: '5px'}} type="star-o" onClick={this.addFavorite.bind(this)}/>
                              <span className="star-text">{favoriteText}(人气{this.state.favoriteLen})</span>
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
                </div>
            )
        }
        return (<div>...</div>)
    }
}
