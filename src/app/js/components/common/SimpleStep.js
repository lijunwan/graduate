import React, { Component, PropTypes } from 'react';
import {Steps} from 'antd';
const Step = Steps.Step;
export default class SimpleStep extends Component {
	constructor(props) {
    	super(props);
  	}
	createSteps() {
		let steps = [{
			title: '我的购物车',
		},{
			title: '填写订单',
		},{
			title: "支付",
		},{
			title: "完成订单",
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
