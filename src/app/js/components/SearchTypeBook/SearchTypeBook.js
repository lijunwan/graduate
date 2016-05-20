import React, { Component, PropTypes } from 'react';
import SearchBar from '../common/SearchBar';
import BookMenu from '../index/BookMenu'
import {Row, Col,Carousel} from 'antd';
import sliderImg1 from '../../../images/slider1.jpg';
import sliderImg2 from '../../../images/slider2.jpg';
import sliderImg3 from '../../../images/slider3.jpg';
import sliderImg4 from '../../../images/slider4.jpg';
import sliderImg5 from '../../../images/slider5.jpg';
import PromBook from '../common/PromBook';
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
                    <p className="ContentSlider-bookName"><a title={item.bookName} onClick = {this.redirectBookPage.bind(this, item.detail)}>{item.bookName}</a></p>
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
                    <Col span="4" style={{width: '720px',marginLeft: '10px'}}>
                        <div style={{height: '296px'}}>
                            <Carousel autoplay="true">
                                    <div><img style={{width: '100%', height: '100%'}} src={sliderImg1} /></div>
                                    <div><img style={{width: '100%', height: '100%'}} src={sliderImg2} /></div>
                                    <div><img style={{width: '100%', height: '100%'}} src={sliderImg3} /></div>
                                    <div><img style={{width: '100%', height: '100%'}} src={sliderImg4} /></div>
                                    <div><img style={{width: '100%', height: '100%'}} src={sliderImg5} /></div>
                                </Carousel>
                        </div>
                        <div style={{margin: '50px 0 20px'}}>{this.creatTypeMenu()}</div>
                        {this.createBookItem()}
                    </Col>
                    <Col span="4" width={{width:'200px'}}>
                        <PromBook {...this.props} />
                    </Col>
                </Row>
            </div>
        )
    }
}
