import React, { Component, PropTypes } from 'react';
import {Row, Col}　from 'antd';
import '../../../css/common/promBook.css';
export default class PromBook extends Component {
	constructor(props) {
    	super(props);
  	}
  	componentDidMount() {
  		this.props.bookeBoundAC.getPromBook();
  	}
  	showBookDetail(bookId){
  		this.props.history.pushState(null, '/book/'+bookId);
  	}
  	createItem(promoBook) {
  		const list = [];
  		if(promoBook.data) {
  			promoBook.data.map((item)=>{
  				list.push(
	  				<div className="item" style={{margin: '10px auto 20px'}}>
	  						<img className="item-img" src={item.cover} />
	  						<p className="bookName"><a onClick={this.showBookDetail.bind(this, item['_id'])}>{item.bookName}</a></p>
	  						<p>￥{item.aprice}</p>	
	  				</div>
  				)
  			})
  		}
  		return list;

  	}
  	render() {
  		const promoBook = this.props.bookInfo.toJS().promoBook;
  		console.log(this.props.bookInfo.toJS().promoBook)
  		return(
  			<div className="PromBook">
  				<h2 className="title">推广商品</h2>
  				{this.createItem(promoBook)}
  			</div>
  		)
  	}
}