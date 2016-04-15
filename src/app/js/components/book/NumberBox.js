import React, { Component, PropTypes } from 'react';
import {Icon} from 'antd';
export default class  NumberBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      count : 1,
    }
  }
  changeValue(event) {
    if(!isNaN(event.target.value)){
      this.setState({
        count: 1,
      })
    }else{
      this.setState({
        count: event.target.value,
      })
    }
  }
  render () {
    return (
      <div className="clearfix">
        <div style={{float: 'left'}}>
          <input type="text" className="NumberBox-input" value={this.state.count} onChange={this.changeValue.bind(this)}/>
        </div>
        <div style={{float: 'left'}}>
          <p><i className="anticon anticon-plus NumberBox-button" style={{marginBottom: '3px'}} /></p>
          <p><i className="anticon anticon-minus NumberBox-button" /></p>
        </div>
      </div>
    )
  }
}
