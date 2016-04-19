import React, { Component, PropTypes } from 'react';
export default class  Favorite extends Component {
  createFavorite() {
    const list = []
  }
  render{
    return(
      <Row>
        <div>排序 时间 仅显示 降价 促销 缺货</div>
        <div>
          {this.createFavorite()}
        </div>
      </Row>
    )
  }
}
