import React, { Component, PropTypes } from 'react';
import '../../../css/common/search.css';
import {Row, Col} from 'antd';
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            autoComplete: [],
        }
    }
    onChangeHandel(event){
        this.setState({
            searchKey: event.target.value
        });
        if(event.target.value !== ''){
            this.props.bookeBoundAC.searchBooks({searchKey: event.target.value});
        } else {
            this.props.bookeBoundAC.clearAutoComplete();
        }
    }
    showSearchResult() {
        this.props.history.pushState(null, '/searchResult', {searchKey: this.state.searchKey});
        this.props.bookeBoundAC.clearAutoComplete();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            autoComplete: nextProps.bookInfo.toJS().autoComplete.data
        });
    }
    showBookDetai(id) {
        this.props.history.pushState(null, '/book/'+ id);
        this.props.bookeBoundAC.clearAutoComplete();
    }
    createBookList() {
        var list = [];
        const autoComplete = this.state.autoComplete;
        if(!autoComplete){
            return;
        }
        autoComplete.map((data)=>{
            list.push(
                <li onClick={this.showBookDetai.bind(this, data.id)}>
                    <Row>
                        <Col span="12">{data.bookName}</Col>
                        <Col span="12" style={{textAlign: 'right'}}>{data.author}</Col>
                    </Row>
                </li>
            )
        })
        return list;
    }
    render() {
        return(
            <div className="Search">
                <input placeholder="请输入图书名或者作者名字进行搜索" onChange = {this.onChangeHandel.bind(this)} value={this.state.searchKey}/>
                <a href="javascript:;" onClick={this.showSearchResult.bind(this)}><i className="fa fa-search"></i></a>
                {
                    this.state.autoComplete && this.state.autoComplete.length > 0 ?
                    <ul className="Search-list">
                        {this.createBookList()}
                    </ul>
                    : ''
                }
            </div>
        )
    }
}
