import React, { Component, PropTypes } from 'react';
import {Icon} from 'antd';
export default class  NumberBox extends Component{
  constructor(props) {
    super(props);
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
      <div className="clearfix NumberBox">
        <p style={{float: 'left'}}><i className="anticon anticon-plus NumberBox-button" style={{marginBottom: '3px'}} onClick={this.props.addNumber.bind(this)} /></p>
        <div style={{float: 'left'}}>
          <input type="text" className="NumberBox-input" value={this.props.count} onChange={this.changeValue.bind(this)}/>
        </div>
        <p style={{float: 'left'}}><i className="anticon anticon-minus NumberBox-button" onClick={this.props.subNumber.bind(this)} /></p>
      </div>
    )
  }
}
