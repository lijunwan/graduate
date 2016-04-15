import React, { Component, PropTypes } from 'react';
export default class  BookTab extends Component{
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    }
  }
  render() {
    return (
      <div>
        <a className="tab-item tab-item-active">商品详情</a>
        <a className="tab-item">商品评论</a>
      </div>
    )
  }
}
