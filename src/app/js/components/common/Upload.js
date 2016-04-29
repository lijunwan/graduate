import React, { Component } from 'react';
import {Icon} from 'antd';
var uploadInput, upLoadForm;
export default class  Upload extends Component {
  previewFile(e) {
    console.log(uploadInput.files[0],'123');
    var file = uploadInput.files[0];
    var reader = new FileReader();
    reader.addEventListener("load",()=>{
       this.props.onChange(reader.result);
    }, false);
    if(file) {
      reader.readAsDataURL(file);
    }
    // console.log(upLoadForm.onClick);
    // upLoadForm.submit();
    var xhr = new XMLHttpRequest();
    var formData = new FormData();

    xhr.open("post", '/api/user/authorization/headImages', true);
    formData.append('file',file);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(formData);
  }
  upload() {

  }
  componentDidMount() {
    uploadInput = document.getElementById('upload');
    upLoadForm = document.getElementById('upForm');
    console.log(uploadInput);
  }
  render() {
    return(
      <div className="Upload-card">
        <Icon type="plus" />
        <p>修改头像</p>
        <input id="upload" type="file"  onChange={this.previewFile.bind(this)}/>
      </div>
    )
  }
}
