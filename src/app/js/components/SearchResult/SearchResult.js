import React, { Component, PropTypes } from 'react';
export default class SearchResult extends Component {
  componentDidMount() {
     // this.props.bookeBoundAC.searchBooks({searchKey: this.props.location.query.searchKey});
  }
  componentWillReceiveProps(nextProps) {
     console.log(nextProps.bookInfo.toJS().autoComplete.data)
  }
  render() {
      console.log(this.props, '====')
      return(
          <div>{this.props.location.query.searchKey}</div>
      )
  }
}
