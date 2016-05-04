import React, { Component, PropTypes } from 'react';
import {Col, message} from 'antd';
import '../../../css/contentSlider.css';
export default class BookItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isaddFavorite: false,
      }
    }
    redirectBookPage(id) {
      this.props.history.pushState(null, '/book/'+id)
    }
    createIntorduce(data) {
      const list = [];
      data.map((item, index)=>{
        list.push(
          <p key={index}>{item}</p>
        );
      });
      return list;
    }
    addFavorite(id) {
      var obj = {
        bookId : id,
      };
      if(!this.state.isaddFavorite) {
        this.props.favoriteBoundAC.addFavorite(obj);
        this.setState({
          isaddFavorite: true,
        })
      }
    }
    addShopCarts(bookId) {
      var obj = {
          bookId:bookId,
          count: 1,
      }
      this.props.clientBoundAC.addBookIntoCars(obj);
      message.success('您已成功添加到购物车，请前往购物车查看');
    }
    componentWillMount() {
      const userInfo = this.props.client.toJS().info.data;
      if(userInfo) {
        const bookInfo = this.props.data;
        userInfo.favorite.map((bookId)=>{
          console.log(bookId, bookInfo.id)
          if(bookId === bookInfo.id) {
            this.setState({
              isaddFavorite: true,
            })
          }
        })
      }
    }
    componentWillReceiveProps(nextProps) {
      const userInfo = nextProps.client.toJS().info.data;
      const bookInfo = nextProps.data;
      if(userInfo) {
        userInfo.favorite.map((bookId)=>{
          if(bookId === bookInfo.id) {
            this.setState({
              isaddFavorite: true,
            })
          }
        })
      }
    }
    countEvalu(evaluation) {
      var scores = 0;
      evaluation.map((data)=>{
        scores += data.scores
      })
    }
    render() {
        const data = this.props.data;
        const salePrice = data.discount/10 * data.price;
        return (
                <div className="BookItem clearfix">
                    <div style={{float:'left'}}>
                        <img src={data.cover} />
                    </div>
                    <div className="text-wrap">
                        <p className="bookName"><a onClick = {this.redirectBookPage.bind(this, data.id)}>{data.bookName}</a></p>
                        <p className='price'>
                            <span className="priceDis">￥{data.aprice}</span>
                            <span><s>￥{data.price}</s></span>
                            <span>({data.discount}折)</span>
                        </p>
                        <p className="author">{data.author}著/{data.pubHouse}/{data.pubDate}</p>
                        <div className="BookItem-introduce">
                        {this.createIntorduce(data.introduce)}
                        </div>
                        <div>
                          已销售：{data.saleNumber}
                        </div>
                        <div>
                          {
                            data.scores <1 ?<p>0人评价</p>
                            :<p>评分：{data.scores}</p>
                          }
                        </div>
                        <div>
                            <a className="button button01" onClick={this.addShopCarts.bind(this, data.id)}>加入购物车</a>
                            {
                              this.state.isaddFavorite ?
                              <a className="button button03">已收藏</a>
                              :
                              <a className="button button02" onClick={this.addFavorite.bind(this, data.id)}>收藏</a>
                            }
                        </div>
                    </div>
                </div>
        )
    }
}
