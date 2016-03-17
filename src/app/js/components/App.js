import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Navbar from './common/Navbar';
// import Header from './common/Header';
// import Breadcrumb from './common/Breadcrumb';
import * as clientAC from '../actions/client';
import Router from 'react-router';
// import '../../scss/common.scss';
//import '../../scss/modalForm.scss'
var RouteHandler = Router.RouteHandler;

class App extends Component{
  componentDidMount() {
     //this.props.clientBoundAC.loadClientInfo();
  }

  render() {
    console.log("dkfjd",this.props.children)
      return (
          <div>
             {React.cloneElement(this.props.children, this.props)}
          </div>
      );
  }

}

function mapStateToProps(state) {
  return {
      client: state.client,
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
            // tablepageBoundAC: bindActionCreators(tablepageAC, dispatch),
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
