import React, { Component, PropTypes } from 'react';
import {Steps} from 'antd';
const Step = Steps.Step;
export default class SimpleStep extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		stepStatus:['wait','wait', 'wait', 'wait'],
    	}
  	}
  	componentWillMount() {
  		var statusList = this.state.stepStatus.slice(0);
  		const stepIndex = this.props.stepIndex;

  		statusList.map((item, index)=>{
  			if(index < stepIndex) {
  				statusList[index] = 'finish';
  			} else if(index > stepIndex) {
  				statusList[index] = 'wait';
  			} else {
  				statusList[index] = 'process';
  			}
  		});
  		console.log(statusList, '=====')
  		this.setState({
  			stepStatus: statusList,
  		})
  	}
	render() {
		return(
			<Steps>
				<Step status= {this.state.stepStatus[0]} title="我的购物车" />
				<Step status={this.state.stepStatus[1]} title="填写订单" />
				<Step status={this.state.stepStatus[2]} title="支付"/>
				<Step status={this.state.stepStatus[3]} title="完成订单"/>
			</Steps>
		)
	}
}