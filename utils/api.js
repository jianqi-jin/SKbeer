const address = {
  getAddressList: function (openid){
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.address_list&openid=' + openid,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          resolve(res);
        }
      })
    })
    

  }
}

module.exports = {
  getAddressList: address.getAddressList
}