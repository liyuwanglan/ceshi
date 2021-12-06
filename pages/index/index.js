// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false // wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.getStorage({
          key: 'authorization',
          success (signature) {
            console.log(signature)
            wx.request({
              url: 'https://wx.gajxsh.com/web/LiDuHuaYuan/20211123/public/index.php?s=Index/saveinfo', //仅为示例，并非真实的接口地址
              method: 'POST',
              data: {
                'rawData': res.rawData,
                'signature': res.signature
              },
              header: {
                'content-type': 'application/json', // 默认值
                'authorization': signature.data
              },
              success (res) {
                console.log(res.data)
              }
            })
          }
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber (e) {
    wx.getStorage({
      key: 'authorization',
      success (signature) {
        wx.request({
          url: 'https://wx.gajxsh.com/web/LiDuHuaYuan/20211123/public/index.php?s=Index/decodeMobile', //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            'encryptedData': e.detail.encryptedData,
            'iv': e.detail.iv
          },
          header: {
            'content-type': 'application/json', // 默认值
            'authorization': signature.data
          },
          success (res) {
            console.log(res.data)
          }
        })
      }
    })
  }
})