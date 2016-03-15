import React, { Component, PropTypes } from 'react';
//import  '../../../scss/index.scss';
export default class  Index extends Component{
	scrollUp(name){
       location.hash=name
	}
	render(){
		return(
			<div>
			<div className="div">
					<div className="testDiv">
						<p id="a">a</p>
						<p id="d">d</p>
						<p id="e">e</p>
					</div>
					<div className="testDiv">
						<p id="b">b</p>
					</div>
					<div className="testDiv">
						<p id="c">c</p>
					</div>
				</div>
				<ul>
					<li><a name="a" onClick={this.scrollUp.bind(this,"a")}>a</a></li>
					<li><a name="b" onClick={this.scrollUp.bind(this,"b")}>b</a></li>
					<li><a name="b" onClick={this.scrollUp.bind(this,"c")}>c</a></li>
					<li><a name="b" onClick={this.scrollUp.bind(this,"d")}>d</a></li>
					<li><a name="c" onClick={this.scrollUp.bind(this,"e")}>e</a></li>
				</ul>
				</div>
				)
	}
}