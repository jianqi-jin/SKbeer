const header = { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'};
const serverUri = 'https://oa.yika.co/';
const address = {
  getAddressList: function (openid){
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.index.address_list&openid=' + openid,
        data: '',
        header,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          resolve(res);
        }
      })
    })
  },
  addAddress: function (openid, obj){
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.index.address_insert&openid=' + openid,
        data: obj,
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) { 
          resolve(res)
        }
      })
    })
    
  },
  getDefalutAdderss: (openid) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.get_address&openid='+openid,
        data: '',
        header,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        }
      })
    })
  },
  changeDefault: function(openid, address_id){
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.change_address&openid='+openid,
        data: { address_id},
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        },
      })
    })
  },
  del: function(openid, address_id){
    return new Promise(resolve => {
      wx.request({
        url: serverUri+'app/ewei_shopv2_api.php?i=46&r=senke.my.address_del&openid=' + openid,
        data: {address_id},
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) { 
          resolve(res);
        },
      })
    })
  },
  getOneAddress: (openid, address_id) => {
    return new Promise(resolve => {
      wx.request({
        url: '',
        data: address_id,
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    })
  }
}

const gifts = {
  getGiftList: function(openid){
    return new Promise(resolve => {
      wx.request({
        url: serverUri+'app/ewei_shopv2_api.php?i=46&r=senke.my.gift_list&openid=' + openid,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          resolve(res)
        }
    })
    })
  }
}

const user = {
  getUserInfo: (openid) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.my.index&openid=' + openid,
        data: '',
        header,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) { 
          resolve(res)
        }
      })
    })
  }
}

const good = {
  getGoodFromId: (openid, goods_id) => {
    return new Promise(resolve => {

      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.goods_details',
        data: { goods_id },
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) { 
          resolve(res)
        }
      })
    })
  }
}

module.exports = {
  getAddressList: address.getAddressList,
  addAddress: address.addAddress,
  changeDefaultAddress: address.changeDefault,
  delAddress: address.del,
  getAddress: address.getOneAddress,
  getGiftList: gifts.getGiftList,
  getDefalutAdderss: address.getDefalutAdderss,
  getUserInfo: user.getUserInfo,
  getGoodFromId: good.getGoodFromId
}