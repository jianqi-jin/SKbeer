const serverUri = 'https://oa.yika.co/';


const {
  postI,
  barTitle,
  header,
  appid
} = require('./base/jiaLan.js')



const request = (type, data) => {
  return new Promise(resolve => {
    wx.request({
      url: serverUri + 'app/ewei_shopv2_api.php?i=' + postI + '&r=' + type + '&openid=' + ((getApp() == undefined) ? "" : getApp().globalData.openid),
      data: data ? data : '',
      header,
      method: data ? 'POST' : 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        resolve(res)
      }
    })
  })
}
module.exports = {
  getThemes: () => request('senke.my.get_shop_style'),
  getAddressList: (openid) => request('senke.index.address_list'),
  addAddress: (etc, data) => request('senke.index.address_insert', data),
  changeDefaultAddress: (etc, address_id) => request('senke.index.change_address', {
    address_id
  }),
  delAddress: (etc, address_id) => request('senke.my.address_del', {
    address_id
  }),
  editAddress: (etc, data) => request('senke.my.address_edit', data),
  getDefalutAdderss: () => request('senke.index.get_address'),
  getGiftInfo: (etc, data) => request('senke.my.gift_detail', data),
  getGiftList: () => request('senke.my.gift_list'),
  agentPay: (etc, data) => request('senke.my.agent_pay', data),
  getUpgreadUpInfo: (data) => request('senke.my.dl_upgrade', data),
  getOrderInfo: (etc, data) => request('senke.my.agent_pay_ok', data),
  getTeamDetail: (etc, data) => request('senke.my.team_detail', data),
  getTeamDetail2: (etc, data) => request('senke.my.team_detail2', data),
  chuZhiPay: (etc, data) => request('senke.my.chuzhi', data),
  getYueDetails: (etc, data) => request('senke.my.yue_details', data),
  getShouyi: (etc, data) => request('senke.my.shouyi_log', data),
  getUserInfo: () => request('senke.my.index'),
  getGoodFromId: (etc, goods_id) => request('senke.index.goods_details', {
    goods_id
  }),
  getGoodInfo: data => request('senke.index.get_param', data),
  getGoodSpec: data => request('senke.index.get_spec', data),
  getOrderDetail: data => request('senke.order.order_detail', data),
  getGoodOrderInfo: data => request('senke.index.order_show', data),
  getGoodOrderList: data => request('senke.order.index', data),
  getPriceByOption: (etc, data) => request('senke.index.get_option', data),
  orderPay: (etc, data) => request('senke.index.order_pay', data),
  closeOrder: (etc, data) => request('senke.order.order_close', data),
  delOrder: (etc, data) => request('senke.order.order_del', data),
  payOrder: (etc, data) => request('senke.order.order_detail_pay', data),
  getDrawHis: () => request('senke.my.tixian_log'),
  getReferCenterInfo: () => request('senke.my.tuiguang'),
  addCard: (etc, data) => request('senke.my.bank_card_add', data),
  getDefaultCard: () => request('senke.my.bank_card_default'),
  sendMsg: (etc, data) => request('senke.my.send_code', data),
  getCardList: () => request('senke.my.bank_card_list'),
  changeDefaultCard: (etc, data) => request('senke.my.change_card', data),
  delCard: (etc, data) => request('senke.my.card_del', data),
  tixian: (etc, data) => request('senke.my.tixian_go', data),
  getMyTeam: data => request('senke.my.my_team', data),
  getTeam: data => request('senke.my.my_team2', data),
  getShare: () => request('senke.tuijian.get_share'),
  shareclum: data => request('senke.tuijian.fenxiang', data),
  getReferLsit: data => request('senke.tuijian.index', data),
  getDjInfo: data => request('senke.my.dj_money_log', data),
  postI,
  getWuliu: (etc, data) => request('senke.order.get_logistics', data),
  login: data => request('wxapp.login', data),
  bindScene: data => request('senke.login.index', data),
  reg: data => request('wxapp.auth', data),
  getHomeInfo: (data) => request('senke.index.index', data),
  parent: data => request('senke.tuijian.fenxiang_parent', data),
  serverUri,
  barTitle,
  getReferList: () => request('senke.my.tuijian_log')
}