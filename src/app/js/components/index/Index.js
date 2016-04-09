import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
import Search from '../common/Search';
import BookMenu from './BookMenu';
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
	render(){
		return(
			<div className="Index">
				<div className="Index-header clearfix">
					<img src={logoImg} alt=""/>
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
					</div>
					<div className="Index-right">
						
					</div>
			  </div>
			</div>
	  )
	}
}
