import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
import Search from '../common/Search';
import BookMenu from './BookMenu'
export default class  Index extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="Index">
				<div className="Index-header">
					<img src={logoImg} alt=""/>
					<div className="Index-search">
						<Search {...this.props} />
					</div>
				</div>
				<BookMenu {...this.props} />
			</div>
	  )
	}
}
