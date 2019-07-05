const header = {
  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
};
const serverUri = 'https://oa.yika.co/';
const address = {
  getAddressList: function(openid) {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.index.address_list&openid=' + openid,
        data: '',
        header,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res);
        }
      })
    })
  },
  addAddress: function(openid, obj) {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.index.address_insert&openid=' + openid,
        data: obj,
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        }
      })
    })

  },
  getDefalutAdderss: (openid) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.get_address&openid=' + openid,
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
  changeDefault: function(openid, address_id) {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.change_address&openid=' + openid,
        data: {
          address_id
        },
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
  del: function(openid, address_id) {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.address_del&openid=' + openid,
        data: {
          address_id
        },
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
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
  getGiftList: function(openid) {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.gift_list&openid=' + openid,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        }
      })
    })
  }
}

const user = {
  getReferCenterInfo: (openid) => {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.tuiguang&openid=' + openid,
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
  getUserInfo: (openid) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.my.index&openid=' + openid,
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
  getDrawHis: (openid) => {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.tixian_log&openid=' + openid,
        data: '',
        header,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        },
        complete: function(res) {
          console.log(res)
        }
      })
    })
  }
}

const good = {
  getGoodInfo: (data) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.get_param',
        data,
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        }
      })
    })
  },
  getGoodSpec: (data) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.get_spec',
        data,
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        }
      })
    })
  },
  getGoodFromId: (openid, goods_id) => {
    return new Promise(resolve => {

      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.goods_details',
        data: {
          goods_id
        },
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        }
      })
    })
  }
}


const bankCard = {
  addCard: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.my.bank_card_add&openid=' + openid,
        data,
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        }
      })
    })
  },
  getDefaultCard: (openid) => {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.bank_card_default&openid=' + openid,
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
  sendMsg: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.send_code&openid=' + openid,
        data,
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        }
      })
    })
  },
  getCardList: (openid) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.my.bank_card_list&openid=' + openid,
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
  changeDefaultCard: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.change_card&openid=' + openid,
        data,
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          resolve(res)
        }
      })
    })
  },
  delCard: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.card_del&openid=' + openid,
        data,
        header,
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
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
  getGoodFromId: good.getGoodFromId,
  getGoodInfo: good.getGoodInfo,
  getGoodSpec: good.getGoodSpec, 
  getDrawHis: user.getDrawHis,
  getReferCenterInfo: user.getReferCenterInfo,
  addCard: bankCard.addCard,
  getDefaultCard: bankCard.getDefaultCard,
  sendMsg: bankCard.sendMsg,
  getCardList: bankCard.getCardList,
  changeDefaultCard: bankCard.changeDefaultCard,
  delCard: bankCard.delCard
}