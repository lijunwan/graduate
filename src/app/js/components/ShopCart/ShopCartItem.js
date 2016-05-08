import React, { Component, PropTypes } from 'react';
import {Row,Col, Checkbox,Modal} from 'antd';
import NumberBox from '../book/NumberBox';
import __keys from 'lodash/keys';
export default class  ShopCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      isChecked: false,
      delInfoModal: false,
      removeModal: false,
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
      count: this.props.data.shopCartInfo.count,
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
 removeToFav() {
    this.setState({
        removeModal: true,
    })
 }
 removeHandelOk(cartId,bookId){
    this.props.clientBoundAC.delShopCart({cartId: cartId});
    this.props.favoriteBoundAC.addFavorite({bookId: bookId});
    this.setState({
        removeModal:false,
    })
 }
 removeHandelCancel() {
    this.setState({
        removeModal:false,
    })
 }
 delShopCart() {
    this.setState({
        delInfoModal: true,
    })
  }
  handleCancel() {
    this.setState({
        delInfoModal: false,
    })
  }
 handleOk(cartId) {
    this.props.clientBoundAC.delShopCart({cartId: cartId});
    this.setState({
        delInfoModal: false,
    })
 }
  render() {
    const data = this.props.data;
    const isEmpty = __keys(data.bookInfo).length < 1 ? true : false;
    const sumMon = isEmpty ? 0 :(data.bookInfo.aprice * this.state.count).toFixed(2);
    return(
        <div>
            {
                isEmpty ?
                <Row>
                  <Col span="4">
                    <Checkbox style={{position: 'absolute',left: '0'}} disabled/><img className="ShopCartItem-img" src= {data.shopCartInfo.cover} />
                  </Col>
                  <Col span="4">
                    <p>{data.shopCartInfo.bookName}</p>
                  </Col>
                  <Col span="4">
                    <p>{data.shopCartInfo.aprice}</p>
                  </Col>
                  <Col span="8">
                    <p>宝贝已失效</p>
                  </Col>
                  <Col span="4">
                    <p><a onClick={this.delShopCart.bind(this)}>删除</a></p>
                  </Col>
                </Row>
                 :
                <Row>
                  <Col span="4">
                    <Checkbox style={{position: 'absolute',left: '0'}} checked={this.props.checkboxChild[this.props.index]} onChange={this.choiceBook.bind(this)}/><img className="ShopCartItem-img" src= {data.bookInfo.cover} />
                  </Col>
                  <Col span="4">
                    <p>{data.bookInfo.bookName}</p>
                  </Col>
                  <Col span="4">
                    <p>{data.bookInfo.aprice}</p>
                  </Col>
                  <Col span="4">
                    <NumberBox addNumber={this.addNumber.bind(this)} subNumber={this.subNumber.bind(this)} count={this.state.count}/>
                  </Col>
                  <Col span="4">
                    <p>{sumMon}</p>
                  </Col>
                  <Col span="4">
                    <p><a onClick={this.removeToFav.bind(this)}>移入收藏夹</a></p>
                    <p><a onClick={this.delShopCart.bind(this)}>删除</a></p>
                  </Col>
                </Row>
            }
            <Modal title="信息提示框" visible={this.state.delInfoModal}
              onOk={this.handleOk.bind(this,data.shopCartInfo['_id'])} onCancel={this.handleCancel.bind(this)}>
              <p>是否删除该商品</p>
            </Modal>
            <Modal title="信息提示框" visible={this.state.removeModal}
              onOk={this.removeHandelOk.bind(this,data.shopCartInfo['_id'],data.shopCartInfo.bookId)} onCancel={this.removeHandelCancel.bind(this)}>
              <p>是否将该商品移入收藏夹</p>
            </Modal>
        </div>

    )
  }
}
