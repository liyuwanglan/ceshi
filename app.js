// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        wx.request({
          url: 'https://wx.gajxsh.com/web/LiDuHuaYuan/20211123/public/index.php?s=Index/login&jscode='+res.code, //仅为示例，并非真实的接口地址
          success (res) {
            console.log(res.data)
            wx.setStorage({
              key:"authorization",
              data:res.data.token
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
