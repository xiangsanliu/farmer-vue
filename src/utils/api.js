import {MessageBox, Message} from "element-ui";
import axios from 'axios';

/**
 * HTTP GET
 * @param url url
 * @param onSuccess Success Callback
 */
export const httpGet = (url, onSuccess) => {
    axios.get(url).then(response => {
        handleResponseBean(response.data, onSuccess);
    }).catch(error => {
        Message.error(error.response.data);
    })
};

/**
 * HTTP GET
 * @param url url
 * @param postData Post Data
 * @param onSuccess Success Callback
 */
export const httpPost = (url, postData, onSuccess) => {
    axios.post(url, postData).then(response => {
        handleResponseBean(response.data, onSuccess);
    }).catch(error => {
        Message.error(error.response.data);
    })
};

/**
 * Handle Response From SpringBoot
 * @param responseBean Defined in SpringBoot: ResponseBean.class
 * @param onSuccess Success Callback
 */
const handleResponseBean = (responseBean, onSuccess) => {
    if (200 === responseBean.status) {
        onSuccess(responseBean);
    } else if (401 === responseBean.status) {
        MessageBox.alert('未登录,请先登录!', '提示', {
            confirmButtonText: '确定',
            callback: function () {
                window.location.href = "/login.html";
            }
        });
    } else if (403 === responseBean.status) {
        Message.error('无此权限');
    }
};