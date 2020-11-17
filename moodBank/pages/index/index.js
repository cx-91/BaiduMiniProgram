//index.js
const app = getApp();
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onReady() {},

  onLoad: function () {
    if (!swan.cloud) {
      swan.redirectTo({
        url: '../chooseLib/chooseLib'
      });
      return;
    } // 获取用户信息


    swan.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          swan.getUserInfo({
            success: res => {
              console.log(res.userInfo);
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              });
            }
          });
        }
      }
    });
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      });
    }
  },
  onGetOpenid: function () {
    // 调用云函数
    swan.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
        app.globalData.openid = res.result.openid;
        swan.navigateTo({
          url: '../userConsole/userConsole'
        });
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err);
        swan.navigateTo({
          url: '../deployFunctions/deployFunctions'
        });
      }
    });
  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    swan.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        swan.showLoading({
          title: '上传中'
        });
        const filePath = res.tempFilePaths[0]; // 上传图片

        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0];
        swan.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res);
            app.globalData.fileID = res.fileID;
            app.globalData.cloudPath = cloudPath;
            app.globalData.imagePath = filePath;
            swan.navigateTo({
              url: '../storageConsole/storageConsole'
            });
          },
          fail: e => {
            console.error('[上传文件] 失败：', e);
            swan.showToast({
              icon: 'none',
              title: '上传失败'
            });
          },
          complete: () => {
            swan.hideLoading();
          }
        });
      },
      fail: e => {
        console.error(e);
      }
    });
  }
});