import React, { Component, PropTypes } from 'react';
import '../../../css/common/search.css'
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
        }
    }
    onChangeHandel(event){
        this.setState({
            searchKey: event.target.value
        })
        this.props.bookeBoundAC.searchBooks({searchKey: this.state.searchKey});
    }
    render() {
        return(
            <div className="Search">
                <input placeholder="请输入图书名或者作者名字进行搜索" onChange = {this.onChangeHandel.bind(this)} vlue={this.state.searchKey}/>
                <a href="javascript:;"><i className="fa fa-search"></i></a>
            </div>
        )
    }
}
