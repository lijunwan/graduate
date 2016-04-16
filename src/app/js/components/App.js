import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientAC from '../actions/client';
import * as bookAC from '../actions/book';
import Router from 'react-router';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import '../../css/normalize.css';
import 'antd/lib/index.css';
import logoImg from '../../images/logo.jpg';
import Search from './common/Search';
var RouteHandler = Router.RouteHandler;

export default class App extends Component{
  componentDidMount() {
    console.log("this.props",this.props)
    this.props.clientBoundAC.getLog();
  }
  render() {
      return (
          <div>
            {
                this.props.routes[1]&&this.props.routes[1].name=="login" ? "" :
                <div>
                    <Header {...this.props}/>
                    <div className="Index-header clearfix" style={{width:'1200px',margin: '50px auto'}}>
    					<a href="/"><img src={logoImg} alt=""/></a>
    					<div className="Index-search">
    						<Search {...this.props} />
    					</div>
    				</div>
                </div>
            }
            <div style={{width:'1200px',margin: 'auto'}}>
                {React.cloneElement(this.props.children, this.props)}
            </div>
            <Footer />
          </div>
      );
  }

}

function mapStateToProps(state) {
  return {
      client: state.client,
      bookInfo: state.bookInfo
      // tablepage:  state.page,
      // dataPlatform: state.dataPlatform,
      // dataCondition:state.dataCondition,
      // dataNavigation:state.dataNavigation,
      // dataSuggest:state.dataSuggest,
      // dataProvince:state.dataProvince,
      // dataStatistic:state.dataStatistic,
      // dataSource: state.dataSource
  };
}

function mapDispatchToProps(dispatch) {
      return {
            clientBoundAC: bindActionCreators(clientAC, dispatch),
            bookeBoundAC: bindActionCreators(bookAC, dispatch),
            // getDataPlatformBoundAC:bindActionCreators( getPlatformDataAC,dispatch),
            // getDataConditionBoundAC:bindActionCreators( getDataConditionAC,dispatch),
            // getDataNavigationBoundAC:bindActionCreators( getDataNavigationAC,dispatch),
            // getDataSuggestBoundAC:bindActionCreators( getDataSuggestAC,dispatch),
            // getDataProvinceBoundAC:bindActionCreators( getDataProvinceAC,dispatch),
            // getDataStatisticBoundAC:bindActionCreators( getDatastatisticAC,dispatch),
            // getDataSourceBoundAC:bindActionCreators( getDataSourceAC,dispatch),
      }
}

export default connect(
      mapStateToProps,
      mapDispatchToProps
)(App);
