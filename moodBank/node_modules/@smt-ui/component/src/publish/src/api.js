/**
 * @file wrap api with promise
 * @author houyu(houyu01@baidu.com)
 */

module.exports = {

    chooseImage: params => new Promise((resolve, reject) => {
        swan.chooseImage({
            ...params,
            success: resolve,
            fail: reject
        });
    }),

    getImageInfo: params => new Promise((resolve, reject) => {
        swan.getImageInfo({
            ...params,
            success: resolve,
            fail: reject
        });
    })
};
