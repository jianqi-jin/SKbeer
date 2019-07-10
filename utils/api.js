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
  editAddress: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.my.address_edit&openid=' + openid,
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
  getUpgreadUpInfo: function(openid) {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.my.dl_upgrade&openid=' + openid,
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
  agentPay: function(openid, data) {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.my.agent_pay&openid=' + openid,
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
  chuZhiPay: (openid, data) => {//user页面储值
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.chuzhi&openid=' + openid,
        data,
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
  getYueDetails: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.yue_details&openid=' + openid,
        data,
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
  getShouyi: (openid,data) => {
    return new Promise(resolve => {
      wx.request({
        url: serverUri + 'app/ewei_shopv2_api.php?i=46&r=senke.my.shouyi_log&openid=' + openid,
        data,
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
  closeOrder: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.order.order_close&openid=' + openid,
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
  delOrder: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.order.order_del&openid=' + openid,
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
  orderPay: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.order_pay&&openid=' + openid,
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
  getPriceByOption: (openid, data) => {
    return new Promise(resolve => {
      wx.request({
        url: 'https://oa.yika.co/app/ewei_shopv2_api.php?i=46&r=senke.index.get_option&openid=' + openid,
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
  editAddress: address.editAddress,
  getAddress: address.getOneAddress,
  getGiftList: gifts.getGiftList,
  agentPay: gifts.agentPay,
  getUpgreadUpInfo: gifts.getUpgreadUpInfo,
  getDefalutAdderss: address.getDefalutAdderss,
  chuZhiPay: user.chuZhiPay,
  getYueDetails: user.getYueDetails,
  getShouyi: user.getShouyi,
  getUserInfo: user.getUserInfo,
  getGoodFromId: good.getGoodFromId,
  getGoodInfo: good.getGoodInfo,
  getGoodSpec: good.getGoodSpec,
  getPriceByOption: good.getPriceByOption,
  orderPay: good.orderPay,
  closeOrder: good.closeOrder,
  delOrder: good.delOrder,
  getDrawHis: user.getDrawHis,
  getReferCenterInfo: user.getReferCenterInfo,
  addCard: bankCard.addCard,
  getDefaultCard: bankCard.getDefaultCard,
  sendMsg: bankCard.sendMsg,
  getCardList: bankCard.getCardList,
  changeDefaultCard: bankCard.changeDefaultCard,
  delCard: bankCard.delCard
}