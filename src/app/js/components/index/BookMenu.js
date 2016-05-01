import React, { Component, PropTypes } from 'react';
import config from '../../dict';
import '../../../css/bookMenu.css';
export default class BookMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowMenu: false,
		}
	}
	createMenu(data) {
		var list = []
		data.map((menu)=>{
			list.push(
				<LevelMenu  data = {menu} {...this.props}/>

			)
		})
		return list;
	}
	componentDidMount() {
		this.props.bookeBoundAC.getBookMenu();
	}
	render() {
		console.log(this.props.bookInfo.toJS().bookMenu.data,"BookMenu")
		const bookMenu = this.props.bookInfo.toJS().bookMenu.data;
		if(bookMenu) {
			return(
				<div className="BookMenu">
					<h3 className="BookMenu-title">图书分类</h3>
					<div className="BookMenu-body">{this.createMenu(bookMenu)}</div>
				</div>
			)
		}
		return(
			<div>...</div>
		)
	}
}
class LevelMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowMenu: false,
		}
	}
	showHideMenu() {
		this.setState({
			isShowMenu: true,
		})
	}
	hideMenu() {
		this.setState({
			isShowMenu: false,
		})
	}
	searchByType(type) {
		this.props.history.pushState(null, '/searchTypeBook/'+ type);
		console.log(this.props.routes, '????')
		const routes = this.props.routes;
		if(routes[1] && routes[1].name == 'searchTypeBook') {
			this.props.bookeBoundAC.searchByType({type:type});
		}
	}
	createItems () {
		const list = [];
		const menu = this.props.data;
		menu.children.map((menuChild)=>{
			list.push(<li><a className="BookMenu-level2" onClick={this.searchByType.bind(this, menuChild.flag)}>{menuChild.name}</a></li>)
		})
		return list;
	}
	createHideMenu() {
		const hideMenu = [];
		const menu = this.props.data;
		menu.children.map((menuChild)=>{
			const hideMenuLevel = [];
			menuChild.children.map((data)=>{
				hideMenuLevel.push(
					<li><a onClick={this.searchByType.bind(this,data.flag)}>{data.name}</a></li>
				)
			});
			hideMenu.push(
				<ul>
					<p className="HideMenu-title">{menuChild.name}</p>
					{hideMenuLevel}
				</ul>
			)
		});
		return hideMenu;
	}
	render() {
		const bookMenuUlWrapCss = this.state.isShowMenu ? 'BookMenu-ul-wrap BookMenu-ul-wrap-hover': 'BookMenu-ul-wrap';
		const bookMenuUlCss = this.state.isShowMenu ? 'BookMenu-ul BookMenu-ul-hover' : 'BookMenu-ul';
		return (
			<div className="BookMenu-level"
				 onMouseEnter = {this.showHideMenu.bind(this)}
				 onMouseLeave = {this.hideMenu.bind(this)}>
				<div className={bookMenuUlWrapCss}>
					<ul className={bookMenuUlCss}>
						<p><a className="BookMenu-meun">{this.props.data.name}</a></p>
						{this.createItems()}
					</ul>
				</div>
				{
					this.state.isShowMenu ?
					<div className="HideMenu">
						{this.createHideMenu()}
					</div>
					: ''
				}
			</div>
		);
	}
}
