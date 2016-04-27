import React, { Component, PropTypes } from 'react';
import {Steps} from 'antd';
const Step = Steps.Step;
export default class SimpleStep extends Component {
	constructor(props) {
    	super(props);
  	}
	createSteps() {
		let steps = [{
			title: '拍下商品',
		},{
			title: '支付',
		},{
			title: "卖家发货",
		},{
			title: "确认收货",
		},{
			title: "评价",
		}];
		const list = [];
		steps.map((step, index)=>{
			list.push(
				<Step key={index} title={step.title} />
			)
		});
		return list;
	}
	render() {
		return(
			<Steps current={this.props.stepIndex}>
				{this.createSteps()}
			</Steps>
		)
	}
}
