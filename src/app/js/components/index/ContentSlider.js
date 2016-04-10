import React, { Component, PropTypes } from 'react';
import { Carousel } from 'antd';
import '../../../css/contentSlider.css';
export default class  ContentSlider extends Component{
    constructor(props) {
        super(props)
    }
    redirectBookPage(id) {
        this.props.history.pushState(null, '/book/'+id)
    }
    createBookSlider(data) {
        if(data){
        var count = data.length / 8 ;
        const content = [];
            for(let i = 0; i < data.length; i += 8){
                const bookItem = [];
                const sliderData = data.slice(i,i+8);
                sliderData.map((item)=>{
                    const salePrice = item.discount/10 * item.price;
                    bookItem.push(
                        <div className="ContentSlider-Item">
                            <img src={item.cover} />
                            <p className="ContentSlider-bookName"><a onClick = {this.redirectBookPage.bind(this, item.detail)}>{item.bookName}</a></p>
                            <p className="ContentSlider-Item-author">{item.author}</p>
                            <p className='ContentSlider-Item-price'>
                                <span className="ContentSlider-Item-priceDis">￥{salePrice}</span>
                                <span><s>￥{item.price}</s></span>
                            </p>
                        </div>
                    )
                });
                content.push(
                    <div>
                        {bookItem}
                    </div>
                );
            }
            console.log('content===',content);
            return content;
        }
        return [];
    }
    render() {
        return(
            <div>
                <h3 className="ContentSlider-title">
                    <span className="ContentSlider-title-first">{this.props.titleFirst}</span>
                    {this.props.title}
                </h3>
                <hr className="ContentSlider-hr"></hr>
                <div style={{height: '500px'}}>
                    <Carousel>
                        {this.createBookSlider(this.props.data.data)}
                    </Carousel>
                </div>
            </div>
        )
    }
}
