import React, { Component, PropTypes } from 'react';
import config from '../../dict'
export default class BookMenu extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		console.log(config,"BookMenu")
		return(
			<p>BookMenu</p>
		)
	}
}