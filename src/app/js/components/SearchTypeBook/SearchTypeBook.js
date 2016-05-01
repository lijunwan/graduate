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
        if(type) {
            type.map((item)=>{
                list.push(
                    <a onClick={this.searchByType.bind(this,item.type)}>{item.name}/</a>
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
                        {this.creatTypeMenu()}
                    </Col>
                </Row>
            </div>
        )
    }
}
