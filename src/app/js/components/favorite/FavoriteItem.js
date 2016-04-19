import React, { Component, PropTypes } from 'react';
export default class  FavoriteItem extends Component {
  render{
    return(
      <Col span="4">
        <div>
          <img src="/book/cover.jpg" />
          <p>js高级程序设计</p>
          <p><span>促</span>￥30.50<s>￥31.50</s></p>
        </div>
      </Col>
    )
  }
}
