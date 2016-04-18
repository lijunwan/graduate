import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
import Search from '../common/Search';
import BookMenu from './BookMenu';
import ContentSlider from './ContentSlider';
import { Carousel } from 'antd';
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
					<div className="Index-right">

					</div>
			  </div>
			</div>
	  )
	}
}
