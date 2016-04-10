import React, { Component, PropTypes } from 'react';
import { Carousel } from 'antd';
export default class  ContentSlider extends Component{
    constructor(props) {
        super(props)
    }
    createBookSlider(data) {
        if(data){
        var count = data.length / 8 + 1 ;
            for(let i = 0; i < count; i += 8){
                const sliderData = data.slice(i,i+8);
                console.log(sliderData, 'sliderData====');
            }
        }
    }
    render() {
        return(
            <div>
            <h3>{this.props.title}</h3>
            <div>{this.createBookSlider(this.props.data.data)}</div>
            </div>
        )
    }
}
