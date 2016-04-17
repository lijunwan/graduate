import React, { Component, PropTypes } from 'react';
import { Pagination } from 'antd';
import __slice from 'lodash/slice';
import BookItem from './BookItem';
import '../../../css/searchResult/searchResult.css';
import {Row} from 'antd'
export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            currentPage: 1,
            pageSize: 30,
            currentData :[],
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
     console.log(nextProps.bookInfo.toJS().bookList.data);
     const data = nextProps.bookInfo.toJS().bookList.data
     this.setState({
         currentData: this.getCurentData(data,1,this.state.pageSize),
         bookList: data ,
     })
  }
  changePage(page) {
     this.setState({
         currentData: this.getCurentData(this.state.bookList,page,this.state.pageSize)
     })
  }
  createItem() {
      const list = [];
      this.state.currentData.map((data, index)=>{
         list.push( <BookItem data={data}  key = {index}/>);
     });
     return list;
  }
  render() {
      console.log('======!!!',this.state.currentData)
      if(this.props.bookInfo.toJS().bookList.data){
          const bookList = this.props.bookInfo.toJS().bookList.data;
          return(
              <div>
                <div>
                    <ul className="sort-menu clearfix">
                        <li><a>默认排序</a></li>
                        <li><a>销量</a></li>
                        <li><a>好评</a></li>
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
                <Pagination total = {bookList.length} pageSize = {this.state.pageSize}  onChange = {this.changePage.bind(this)}/>
              </div>
          )
      }
      return <div>...</div>
  }
}
