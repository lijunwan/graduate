import React, { Component, PropTypes } from 'react';
import '../../../css/common/search.css'
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
        console.log(event.target.value,'??@')
        this.props.bookeBoundAC.searchBooks({searchKey: event.target.value});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            autoComplete: nextProps.bookInfo.toJS().autoComplete.data
        });
        console.log('-----123',nextProps.bookInfo.toJS())
    }
    createBookList() {
        var list = [];
        const autoComplete = this.state.autoComplete;
        if(!autoComplete){
            return;
        }
        autoComplete.map((data)=>{
            list.push(
                <li>
                    <span>{data.bookName}</span>
                    <span>{data.author}</span>
                </li>
            )
        })
        return list;
    }
    render() {
        return(
            <div className="Search">
                <input placeholder="请输入图书名或者作者名字进行搜索" onChange = {this.onChangeHandel.bind(this)} value={this.state.searchKey}/>
                <a href="javascript:;"><i className="fa fa-search"></i></a>
                <ul>
                    {this.createBookList()}
                </ul>
            </div>
        )
    }
}
