import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
import Search from '../common/Search';
import BookMenu from './BookMenu';
import ContentSlider from './ContentSlider';
import { Carousel,Col,Row } from 'antd';
import sliderImg1 from '../../../images/slider1.jpg';
import sliderImg2 from '../../../images/slider2.jpg';
import sliderImg3 from '../../../images/slider3.jpg';
import sliderImg4 from '../../../images/slider4.jpg';
import sliderImg5 from '../../../images/slider5.jpg';

export default class  Index extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount() {
		this.props.bookeBoundAC.getBooksOnSale();
		this.props.bookeBoundAC.getBooksNew();
		this.props.bookeBoundAC.getSalenumberMax();
	}
	showBookDetail(bookId) {
		this.props.history.pushState(null, '/book/'+bookId);
	}
	createBookItem(bookList){
		const list =[];
		if(bookList.data) {
			bookList.data.map((item, index)=> {
				list.push(
					<div className="Index-sale-item">
						<Row>
							<Col span="2">
							  <p className="sale-num">{index+1}</p>
							</Col>
							<Col span="1" style={{width: '120px'}}>
								<img src={item.cover} />
							</Col>
							<Col span="10">
								<p className="sale-bookName"><a onClick={this.showBookDetail.bind(this, item['_id'])}>{item.bookName}</a></p>
								<p　className="sale-aprice">￥{item.aprice}</p>
								<p><s>￥{item.price}</s></p>
								<p>总销售量：{item.saleNumber}</p>
							</Col>
						</Row>
					</div>
				)
			})
		}
		return list;
	}
	render(){
		console.log(this.props.bookInfo.toJS())
		return(
			<div className="Index">
				<div className="Index-header clearfix" style={{width:'1200px',margin: '50px auto'}}>
					<a href="/"><img src={logoImg} alt=""/></a>
				<div className="Index-search">
					<Search {...this.props} />
				</div>
			</div>
				<div className="clearfix Index-container">
					<div className="Index-bookMenu">
						<BookMenu {...this.props} />
					</div>
					<div className="Index-center">
						<div className="Index-slider">
							<Carousel autoplay="true">
								<div><img src={sliderImg1} /></div>
								<div><img src={sliderImg2} /></div>
								<div><img src={sliderImg3} /></div>
								<div><img src={sliderImg4} /></div>
								<div><img src={sliderImg5} /></div>
							</Carousel>
						</div>
						<div style={{marginTop:'50px'}}>
							<ContentSlider titleFirst ="最"
											title="新优惠"
											data = {this.props.bookInfo.toJS().bookOnSale}
											{...this.props}/>
						</div>
						<div style={{marginTop:'50px'}}>
							<ContentSlider titleFirst ="新"
											title="书上架"
											data = {this.props.bookInfo.toJS().bookNew}
											{...this.props}/>
						</div>
					</div>
					<div className="Index-right Index-sale">
						<div className="title">销售排行</div>
						{this.createBookItem(this.props.bookInfo.toJS().saleNumberBook)}
					</div>
			  </div>
			</div>
	  )
	}
}
