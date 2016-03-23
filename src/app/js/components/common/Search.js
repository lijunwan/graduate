import React, { Component, PropTypes } from 'react';
import '../../../css/common/search.css'
export default class Search extends Component {
    render() {
        return(
            <div className="Search">
                <input placeholder="请输入图书名或者作者名字进行搜索"/>
                <a href="javascript:;"><i className="fa fa-search"></i></a>
            </div>
        )
    }
}
