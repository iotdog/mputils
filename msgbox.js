/**
 * 显示简单提示框，包括确认按钮和消息正文
 */
const showAlertSimple = (message) => {
  wx.showModal({
    content: message,
    showCancel: false
  })
}

/**
 * 显示带确认按钮的提示框
 */
const showAlertWithConfirm = (message, confirm) => {
  wx.showModal({
    content: message,
    showCancel: false,
    success: (res) => {
      confirm()
    }
  })
}

/**
 * 显示标准提示框，包括确认和取消按钮、消息标题、消息正文
 */
const showAlertStandard = (title, message, confirm, cancel) => {
  wx.showModal({
    title: title,
    content: message,
    success: (res) => {
      if(res.confirm) {
        confirm()
      } else {
        cancel()
      }
    },
    fail: (res) => {
      console.log('failed to show modal: ', res)
    }
  })
}

/**
 * 显示Toast
 */
const showToast = (msg) => {
  wx.showToast({
    title: msg,
  })
}

module.exports = {
  showAlertSimple: showAlertSimple,
  showAlertWithConfirm: showAlertWithConfirm,
  showAlertStandard: showAlertStandard,
  showToast: showToast
}