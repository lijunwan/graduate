import React, { Component, PropTypes } from 'react';
import SearchBar from '../common/SearchBar';
import BookMenu from '../index/BookMenu'
import {Row, Col} from 'antd';
export default class SearchTypeBook extends Component {
    componentDidMount() {
        console.log(this.props, '///')
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
            type.map((item)=>{
                list.push(
                    <a onClick={this.searchByType.bind(this,item.type)}>{item.name}/</a>
                )
            })
        }
        return list;
    }
    redirectBookPage(bookId) {
        this.props.pushState(null, 'book/'+bookId);
    }
    createBookItem() {
        const data = this.props.bookInfo.toJS().bookListType.data;
        const list = [];
        if(data && data.length>0) {
            data.map((item)=>{
                list.push(
                    <Col span="4">
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
        return(
            <div>
                <SearchBar {...this.props} />
                <Row style={{marginTop: '20px'}}>
                    <Col span="4" style={{width: '190px'}}>
                        <BookMenu {...this.props} />
                    </Col>
                    <Col span="4" style={{width: '1000px', marginLeft: '10px'}}>
                        <div>{this.creatTypeMenu()}</div>
                        {this.createBookItem()}
                    </Col>
                </Row>
            </div>
        )
    }
}
