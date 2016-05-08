import React, { Component, PropTypes } from 'react';
import SearchBar from '../common/SearchBar';
import BookMenu from '../index/BookMenu'
import {Row, Col,Carousel,Pagination} from 'antd';
import sliderImg1 from '../../../images/bookTypeSlider1.jpg';
import sliderImg2 from '../../../images/bookTypeSlider2.jpg';
import sliderImg3 from '../../../images/bookTypeSlider3.jpg';
import sliderImg4 from '../../../images/bookTypeSlider4.jpg';
import sliderImg5 from '../../../images/bookTypeSlider5.jpg';
import '../../../css/searchTypeBook.css';
import PromBook from '../common/PromBook';
import __slice from 'lodash/slice';
export default class SearchTypeBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            currentPage: 1,
            pageSize: 48,
            currentData :[],
        }
    }
     getCurentData(data, current, pageSize) {
      const start = (current-1) * pageSize;
      const end = start + pageSize;
      const dataCuren = __slice(data,start, end);
      return dataCuren;
    
    }
    componentWillReceiveProps(nextProps) {
     const data =  nextProps.bookInfo.toJS().bookListType.data;
     if(data) {
        this.setState({
       currentData: this.getCurentData(data,1,this.state.pageSize),
       bookList: data ,
     })
    }
  }
  changePage(page) {
    console.log('????',page)
     this.setState({
      currentData: this.getCurentData(this.state.bookList,page,this.state.pageSize),
      currentPage: page,
     })
  }
    componentDidMount() {
        const type = this.props.params.type;
        this.props.bookeBoundAC.searchByType({type:type});
    }
    searchByType(type) {
        this.props.bookeBoundAC.searchByType({type:type});
    }
    creatTypeMenu() {
        const type = this.props.bookInfo.toJS().bookListType.type;
        const list = [];
        if(type && type.length>0) {
            type.map((item, index)=>{
                list.push(
                    <a key={index} onClick={this.searchByType.bind(this,item.type)}>{item.name}/</a>
                )
            })
        }
        return list;
    }
    redirectBookPage(bookId) {
        this.props.pushState(null, 'book/'+bookId);
    }
    createBookItem() {
        const data = this.state.currentData;
        const list = [];
        if(data && data.length>0) {
            data.map((item, index)=>{
                list.push(
                    <Col span="6" key={index}>
                    <img style={{width:'100px'}} src={item.cover} />
                    <p className="ContentSlider-bookName"><a onClick = {this.redirectBookPage.bind(this, item.detail)}>{item.bookName}</a></p>
                    <p className="ContentSlider-Item-author">{item.author}</p>
                    <p className='ContentSlider-Item-price'>
                        <span className="ContentSlider-Item-priceDis">￥{item.aprice}</span>
                        <span><s>￥{item.price}</s></span>
                    </p>
                    </Col>
                )
            })
        }
        return list;
    }
    render() {
        console.log(this.state.currentData,'!!!')
        return(
            <div className="clearfix">
                <SearchBar {...this.props} />
                <Row style={{marginTop: '20px'}}>
                    <Col span="4" style={{width: '190px'}}>
                        <BookMenu {...this.props} />
                    </Col>
                    <Col span="4" style={{width: '720px', marginLeft: '10px'}}>
                        <div className="SearchTypeBook-slider">
                            <Carousel autoplay="true">
                                    <div><img src={sliderImg1} /></div>
                                    <div><img src={sliderImg2} /></div>
                                    <div><img src={sliderImg3} /></div>
                                    <div><img src={sliderImg4} /></div>
                                    <div><img src={sliderImg5} /></div>
                             </Carousel>
                         </div>
                        <div>{this.creatTypeMenu()}</div>
                        <Row>{this.createBookItem()}</Row>
                        <div style={{marginTop: '10px'}}>
                             <Pagination total = {this.state.bookList.length} 
                                    current={this.state.currentPage}
                                    pageSize = {this.state.pageSize}  
                                    onChange = {this.changePage.bind(this)}/>
                        </div>
                    </Col>
                    <Col span="4" style={{width: '218px', marginLeft: '10px'}}>
                        <PromBook {...this.props} />
                    </Col>
                </Row>
            </div>
        )
    }
}
