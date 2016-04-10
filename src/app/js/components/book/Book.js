import React, { Component, PropTypes } from 'react';
import '../../../css/book/book.css';
import ImgShow from './ImgShow'
export default class  Book extends Component{
    componentDidMount () {
        console.log(this.props, '====')
        if(this.props.params.bookId) {
            this.props.bookeBoundAC.getBookInfo(this.props.params.bookId)
        }
    }
    render() {
        const bookInfo = this.props.bookInfo.toJS().bookInfo;
        if(bookInfo.data) {
            console.log('=====', bookInfo)
            return(
                <div className="Book clearfix">
                    <div className="Book-infor">
                        <div className="Book-img">
                            <ImgShow data = {bookInfo.data.picture}/>
                        </div>
                        <div className="Book-basic-info">
                            <p>{bookInfo.data.bookName}</p>
                            <p>
                                <span>作者：{bookInfo.data.author}</span>
                                <span>出版社：{bookInfo.data.pubHouse}</span>
                                <span>出版时间：{bookInfo.data.pubDate}</span>
                            </p>
                        </div>
                    </div>
                    <div>书籍详情区</div>
                </div>
            )
        }
        return (<div>...</div>)
    }
}
