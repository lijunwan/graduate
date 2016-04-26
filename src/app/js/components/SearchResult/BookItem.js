import React, { Component, PropTypes } from 'react';
import {Col} from 'antd';
import '../../../css/contentSlider.css';
export default class BookItem extends Component {
    redirectBookPage(id) {
        this.props.history.pushState(null, '/book/'+id)
    }
    createIntorduce(data) {
        const list = [];
        data.map((item, index)=>{
            list.push(
                <p key={index}>{item}</p>
            );
        });
        return list;
    }
    render() {
        const data = this.props.data;
        const salePrice = data.discount/10 * data.price;
        return (
                <div className="BookItem clearfix">
                    <div style={{float:'left'}}>
                        <img src={data.cover} />
                    </div>
                    <div className="text-wrap">
                        <p className="bookName"><a onClick = {this.redirectBookPage.bind(this, data.id)}>{data.bookName}</a></p>
                        <p className='price'>
                            <span className="priceDis">￥{salePrice}</span>
                            <span><s>￥{data.price}</s></span>
                            <span>({data.discount}折)</span>
                        </p>
                        <p className="author">{data.author}著/{data.pubHouse}/{data.pubDate}</p>
                        <div className="BookItem-introduce">
                        {this.createIntorduce(data.introduce)}
                        </div>
                        <div>
                            <a className="button button01">加入购物车</a>
                            <a className="button button02">收藏</a>
                        </div>
                    </div>
                </div>
        )
    }
}
