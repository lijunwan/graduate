import React, { Component, PropTypes } from 'react';
import '../../../css/common/footer.css';
import footerImg1 from '../../../images/validate.gif';
import footerImg2 from '../../../images/knetSealLogo.png';
export default class Footer extends Component {
  render() {
    return(
      <div className="Footer">
        <p>Copyright (C) 智源网 2004-2012, All Rights Reserved|京ICP证041189号音像制品经营许可证 京音网8号</p>
        <div className="Footer-img">
          <img src={footerImg1} alt="" />
          <img src={footerImg2} alt=""/>
        </div>
      </div>
    )
  }
}
