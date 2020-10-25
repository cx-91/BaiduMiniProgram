/**
 * @file top.js
 * @author swan
 */
/* globals Component */
import {checkIsiPhoneX} from '../../utils/article_utils';
/* eslint-disable */
Component({
/* eslint-enable */
    attached() {
        checkIsiPhoneX(this);
    },
    methods: {
        backToTop() {
            this.triggerEvent('top');
        }
    }
});
