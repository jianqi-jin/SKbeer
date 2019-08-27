const env = require('./config.js');

const Base64 = require('./Base64.js');

require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');


const uploadFile = function (filePath, fileW, successCB, errorCB) {
  console.log(fileW);
    if (!filePath || filePath.length < 9) {
        wx.showModal({
            title: '文件错误',
            content: '请重试',
            showCancel: false,
        })
        return;
    }

  //  console.log('上传文件…');
    var filekey = fileW + new Date().getTime() + filePath.substring(filePath.lastIndexOf("/") + 1);
    console.log("filekey",filekey);
    
    const aliyunFileKey = filekey;
    const aliyunServerURL = env.uploadImageUrl;
    const accessid = env.OSSAccessKeyId;
    const policyBase64 = getPolicyBase64();
    const signature = getSignature(policyBase64);
    console.log('aliyunFileKey=', aliyunFileKey);
    console.log('aliyunServerURL', aliyunServerURL);
    wx.uploadFile({
        url: aliyunServerURL, //仅为示例，非真实的接口地址
        filePath: filePath,//.replace('http://', '')
        name: 'file',
        formData: {
            'key': aliyunFileKey,
            'OSSAccessKeyId': accessid,
            'policy': policyBase64,
            'Signature': signature,
            'success_action_status': '200',
        },
        success: function (res) {
            if (res.statusCode != 200) {
                // errorCB(new Error('上传错误:' + JSON.stringify(res)))
         //       console.log(res);
                return;
            }
            console.log('上传文件成功', JSON.stringify(res));
            successCB(aliyunFileKey);//成功返回路径 aliyunServerURL+
        },
        fail: function (err) {
            err.wxaddinfo = aliyunServerURL;
            errorCB(err);
            console.log(err);
        },
    })
}

const getPolicyBase64 = function () {
    let date = new Date();
    date.setHours(date.getHours() + env.timeout);
    let srcT = date.toISOString();
    const policyText = {
        "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 指定了Post请求必须发生在2020年01月01日12点之前("2020-01-01T12:00:00.000Z")。
        "conditions": [
            ["content-length-range", 0, 20 * 1024 * 1024] // 设置上传文件的大小限制,1048576000=1000mb
        ]
    };

    const policyBase64 = Base64.encode(JSON.stringify(policyText));
    return policyBase64;
}

const getSignature = function (policyBase64) {
    const accesskey = env.accesskey;

    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
        asBytes: true
    });
    const signature = Crypto.util.bytesToBase64(bytes);

    return signature;
}

module.exports = uploadFile;