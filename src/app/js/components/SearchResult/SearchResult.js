import React, { Component, PropTypes } from 'react';
import { Pagination } from 'antd';
import __slice from 'lodash/slice';
import __keys from 'lodash/keys';
import __sortBy from 'lodash/sortBy'
import BookItem from './BookItem';
import '../../../css/searchResult/searchResult.css';
import SearchBar from '../common/SearchBar';
import {Row} from 'antd'
export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            currentPage: 1,
            pageSize: 30,
            currentData :[],
            sortKey: 'default',
        }
    }
  getCurentData(data, current, pageSize) {
      const start = (current-1) * pageSize;
      const end = start + pageSize;
      const dataCuren = __slice(data,start, end);
      return dataCuren;
  }
  componentDidMount() {
     this.props.bookeBoundAC.getBookList({searchKey: this.props.location.query.searchKey});
  }
  componentWillReceiveProps(nextProps) {
     const data = nextProps.bookInfo.toJS().bookList.data
     this.setState({
       currentData: this.getCurentData(data,1,this.state.pageSize),
       bookList: data ,
     })
  }
  changePage(page) {
    console.log('????',page)
     this.setState({
      currentData: this.getCurentData(this.state.bookList,page,this.state.pageSize),
      currentPage: page,
     })
  }
  createItem() {
      const list = [];
      this.state.currentData.map((data, index)=>{
         list.push( <BookItem {...this.props} data={data}  key = {index}/>);
     });
     return list;
  }
  changeSort(sortKey) {
    this.setState({
      sortKey: sortKey,
    });
    if(sortKey == 'default') {

    }else {
      var newData = __sortBy(this.state.bookList, sortKey)
    }
  }
  createSortItem() {
    var sortKeyConfig = {
      'default': '默认排序',
      'saleNumber': '销量',
      'scores': '评分',
      'pubDate':'出版时间',
      'aprice': '价格',
    }
    var sortKeyList = __keys(sortKeyConfig);
    const list = [];
    sortKeyList.map((sortKey)=>{
      let keyClass = this.state.sortKey == sortKey ? 'sortKey-active' : 'sortKey'
      list.push(
        <li><a className={keyClass} onClick={this.changeSort.bind(this, sortKey)}>{sortKeyConfig[sortKey]}</a></li>
      )
    })
  }
  render() {
      console.log('======!!!',this.state.currentData)
      if(this.props.bookInfo.toJS().bookList.data){
          const bookList = this.props.bookInfo.toJS().bookList.data;
          return(
              <div>
                <SearchBar {...this.props}/>
                <div>
                    <ul className="sort-menu clearfix">
                        <li><a>默认排序</a></li>
                        <li><a>销量</a></li>
                        <li><a>评分</a></li>
                        <li><a>出版时间</a></li>
                        <li><a>价格</a></li>
                    </ul>
                </div>
                <div className="clearfix">
                    <div className="Item-wrap">
                        {this.createItem()}
                    </div>
                    <div className="SearchResult-recomend">
                        <div className="SearchResult-recomendContent">推荐区</div>
                    </div>
                </div>
                <Pagination total = {bookList.length} current={this.state.currentPage} pageSize = {this.state.pageSize}  onChange = {this.changePage.bind(this)}/>
              </div>
          )
      }
      return <div>...</div>
  }
}
