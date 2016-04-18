import React, { Component, PropTypes } from 'react';
import {Row,Col, Checkbox} from 'antd';
import NumberBox from '../book/NumberBox';
export default class  ShopCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      isChecked: false,
    }

  }
  addNumber() {
    this.setState({
      count: this.state.count + 1,
    });
    const obj = {
      bookId: this.props.data.bookId,
      count: this.state.count + 1,
    }
    this.props.clientBoundAC.updateShopCart(obj);
  }
  subNumber() {
    if(this.state.count >1) {
      this.setState({
        count: this.state.count - 1,
      });
      const obj = {
        bookId: this.props.data.bookId,
        count: this.state.count - 1,
      }
      this.props.clientBoundAC.updateShopCart(obj);
    }
  }
  componentWillMount() {
    this.setState({
      count: this.props.data.count,
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      isChecked: nextProps.isChoiceAll,
    })
  }
  choiceBook() {
    console.log('???===')
    this.props.setIsChecked(this.props.index);
    this.setState({
      isChecked: !this.state.isChecked,
    })
  }
  render() {
    const data = this.props.data;
    const sumMon = (data.aprice * this.state.count).toFixed(2);
    return(
      <Row>
        <Col span="4">
          <Checkbox style={{position: 'absolute', top: '33px', left: '0', zIndex:'2'}} checked={this.props.checkboxChild[this.props.index]} onChange={this.choiceBook.bind(this)}/><img className="ShopCartItem-img" src= {data.cover} />
        </Col>
        <Col span="4">
          <p>{data.bookName}</p>
        </Col>
        <Col span="4">
          <p>{data.aprice}</p>
        </Col>
        <Col span="4">
          <NumberBox addNumber={this.addNumber.bind(this)} subNumber={this.subNumber.bind(this)} count={this.state.count}/>
        </Col>
        <Col span="4">
          <p>{sumMon}</p>
        </Col>
        <Col span="4">
          <p><a>移入收藏夹</a></p>
          <p><a>删除</a></p>
        </Col>
      </Row>
    )
  }
}
