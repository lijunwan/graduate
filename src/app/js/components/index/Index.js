import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
import Search from '../common/Search'
export default class  Index extends Component{
	render(){
		return(
			<div className="Index">
				<div className="Index-header">
					<img src={logoImg} alt=""/>
					<div className="Index-search">
						<Search {...this.props} />
					</div>
				</div>
			</div>
	  )
	}
}
