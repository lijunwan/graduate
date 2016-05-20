import {Modal} from 'antd';
const confirm = Modal.confirm;
export default function intercep(resp) {
    switch (resp.status) {
        case 401:
            confirm({
                title: '信息提示框',
                content: '请先登录',
                onOk() {
                    window.location="/login";
                }
            })
            break;
        default:

    }
    console.log('===intercep', resp)
}
