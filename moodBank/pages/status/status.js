/**
 * @file demo api for showModal
 * @author swan
 */

/* globals swan */

import {feedList} from '../../utils/status_mock';
import {selComponent} from '../../utils/status_index';


Page({ // eslint-disable-line

    data: {
        status: 1,
        idx: 0,
        text: '不超过18个字',
        list: feedList,
        count: 0,
        showPageStatus: true, // 是否显示页面状态
        loading: true, // 是否加载中
        loadingBtn: false, // 是否显示重新加载按钮
        loadingTitle: '网络不给力，请稍后重试', // 页面状态提示文案
        loadingIcon: 'content'// 页面状态图标 content/wifi
    },
    onLoad() {
        this.previewRefresh();
    },
    reloadPage() {
        this.setData({
            loading: true,
            showPageStatus: true
        });
    },
    fetchData(ms = 650) {
        const fail = Math.random() > .9;
        const data = {
            code: fail ? -1 : 0,
            data: fail ? this.data.list : feedList.sort(() =>{
                return Math.random() > 0.5 ? -1 : 1;
            })
        };
        return new Promise(r => setTimeout(() => r(data), ms));
    },
    previewRefresh() {
        this.fetchData().then(data =>{
            const {data: list} = data;
            this.setData({
                status: 1,
                list: list || this.data.list,
                text: list ? `为你推荐${list.length}条更新` : '暂时没有更新，休息一下'
            });
            swan.nextTick(() => {
                this.setData({
                    showPageStatus: false,
                    loaded: true
                });
            });
        });
    },

    onRefresh() {
        selComponent(this, '.pull-down-refresh').then(refresh => {
            this.fetchData().then(data => {
                const {data: list} = data;
                refresh.stopRefresh();
                this.setData({
                    status: 1,
                    count: 0,
                    list: list || this.data.list,
                    text: list ? `为你推荐${list.length}条更新` : '暂时没有更新，休息一下'
                });
            });
        });
    },

    scrollToLower() {
        this.fetchData().then(data => {
            const {data: list} = data;
            const fail = this.data.count === 3;
            const end = this.data.count === 5;
            if (fail || end) {
                this.setData({
                    status: fail ? 3 : 2
                });
                return;
            }
            this.setData({
                list: list.concat(this.data.list || []),
                count: ++this.data.count
            });
        });
    },

    reload() {
        if (this.data.status !== 0 && this.data.status !== 3) {
            return;
        }
        this.setData({
            status: 1,
            count: ++this.data.count
        });
        swan.nextTick(() => {
            this.scrollToLower();
        });
    },

    toArticle(event){
        var idx = event.currentTarget.dataset.idx;
        console.log("input id: ",event.currentTarget.dataset.idx);
        console.log(event);


        swan.navigateTo({
            url: '../article/article?idx=' + idx
          });
    }
});
