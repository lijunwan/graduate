import React, { Component, PropTypes } from 'react';
import '../../../css/book/imgShow.css';
export default class  ImgShow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showImgIndex: 0,
        }
    }
    changeImg(index) {
        console.log('====')
        this.setState({
            showImgIndex: index,
        })
    }
    createImgNav() {
        const list = [];
        this.props.data.map((url, index)=>{
            list.push(
                <li><img onMouseEnter = {this.changeImg.bind(this, index)} src={url} /></li>
            )
        });
        return list;
    }
    render() {
        return(
            <div className="ImgShow">
                <img src={this.props.data[this.state.showImgIndex]} />
                <ul className="ImgShow-nav clearfix">
                    {this.createImgNav()}
                </ul>
            </div>
        )
    }
}
