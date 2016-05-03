import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import SimpleStep from '../common/SimpleStep';
import {Row, Col} from 'antd';
import '../../../css/evaluation.css'
export default class Evaluation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hoverIndex: -1,
			evaluationText: '',
		}
	}
	mouseOverStar(index) {
		this.setState({
			hoverIndex: index,
		})
	}
	handleChange(e) {
		this.setState({
			evaluationText: e.target.value
		})
	}
	submitEvaluation() {
		console.log(this.props.location.query.bookId, '--------bookId');
		const query = this.props.location.query
		var obj = {
			bookId: query.bookId,
			orderId: query.orderId,
			scores: this.state.hoverIndex + 1,
			evaText: this.state.evaluationText,
		}
		this.props.bookeBoundAC.evaluationBook(obj)
	}
	createStars() {
		const list = [];
		for(let i=0;i<5;i++) {
			if(i<=this.state.hoverIndex){
				list.push(
					<i className="anticon anticon-star hover-star"
					   onMouseOver={this.mouseOverStar.bind(this, i)}></i>
				)
			} else{
				list.push(
					<i className="anticon anticon-star-o"
					   onMouseOver={this.mouseOverStar.bind(this, i)}></i>
				)
			}
		}
		return list;
	}
	componentWillReceiveProps(nextProps){
		const data = nextProps.bookInfo.toJS().evalMess.data;
		console.log('???==', data);
		if(data) {
			this.props.history.pushState(null, 'book/'+data.bookId)
		}
	}
	render() {
		console.log(this.props, '-----')
		return(
			<div>
				<Row style={{margin: '50px 0'}}>
					<Col span="8">
						<a href="/"><img src={logoImg}/></a>
					</Col>
					<Col span="16" style={{marginTop: '15px'}}>
						<SimpleStep stepIndex={parseInt("2")} />
					</Col>
				</Row>
				<div>
					<Row>
						<Col span="2">星级评价</Col>
						<Col span="16">{this.createStars()}</Col>
					</Row>
					<Row>
						<Col span="2">文字评价</Col>
						<Col span="5">
							<textarea className="ant-input ant-input-lg"
									  onChange={this.handleChange.bind(this)}
									  value={this.state.evaluationText}/>
						</Col>
					</Row>
				</div>
				<input value="提交评价"　
					   type="button"
					   onClick={this.submitEvaluation.bind(this)}/>
			</div>
		)
	}
}
